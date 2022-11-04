const express = require("express");
const router = express.Router();
const { Compras, User, Product, Cart } = require("../models/index");
const nodemailer = require("nodemailer");

//todas las compras
router.get("/", (req, res) => {
  Compras.findAll().then((compras) => res.send(compras));
});
//compras de un solo usuario
router.get("/search/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  }).then((user) => {
    const userId = user.id;
    Compras.findAll({
      where: {
        userId: userId,
      },
    }).then((compras) => res.send(compras));
  });
});

//cuando se confirma la compra
// nos van a pedir un get q traiga todo lo que haya en el carrito, modificaciones de stock(si no hay stock, avisar), monto final a pagar(si no hay creditos avisar), detalle de productos comprados, modificar el estado de compras con el create y un estado inicial que al modificarse, envie el mail.

router.post("/confirm", (req, res) => {
  Cart.findAll({ where: { userId: req.body.userId } }).then((products) => {
    let finalAmmount = 0;

    let mapResult = products.map((prod) => {
      finalAmmount += prod.finalPrice;
      Product.update(
        { stock: stock > prod.quantity ? stock - prod.quantity : stock },
        {
          where: {
            id: prod.id,
          },
          returning: true,
        }
      ).then(([lienas, resultados]) => {
        resultados[0];
      });
      Compras.create({
        productId: prod.id,
        userId: req.body.userId,
        date: new Date(),
        state: "In process",
      });
    });
    res.send(mapResult, finalAmmount);
  });
});

//para enviar el mail
//confirmacion de compra con todos los datos de la compra
router.post("/send", (req, res) => {
  Compras.findAll({ where: { userId: req.body.userId } }).then((compra) => {
    let id = compra.userId;
    let product = compra.productId;
    Product.findOne({ where: { id: product } }).then((foundProduct) => {
      let name = foundProduct.name;
      User.findOne({ where: { id: id } }).then((foundUser) => {
        let output = `
    <p>Here is your Purchase information</p>
    <h1>Details</h1>
    <li>Nompre : ${foundUser.name}</li>
    <li>Direccion de Entrega: ${foundUser.direccion}</li>
    <li>Producto comprado :${name} </li>
    <li>Creditos restantes:${foundUser.credits}</li>
    <h1>Thanks for your purchase!</h1>
    <h3>Kind Regards,</h3>
    <h3>Al Lio</h3>`;

        let transporter = nodemailer.createTransport({
          host: "gmail",
          auth: {
            user: "franbidonde@gmail.com", // email de gmail
            pass: "", //pass de gmail
          },
          tls: {
            rejectAnouthorized: false,
          },
        });
        let mailOption = {
          from: '"Al Lio" <franbidonde@gmail.com>', // sender address
          to: `${foundUser.email}`, // list of receivers
          subject: "Purchase Confirmation ", // Subject line
          text: "Purchase Confirmation", // plain text body
          html: output, // html body
        };

        transporter.sendMail(mailOption);
        res.sendStatus(200);
      });
    });
  });
});

module.exports = router;
