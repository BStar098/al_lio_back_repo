const { Product, User, Compras } = require("../models");
const nodemailer = require("nodemailer");

const allCompras = (req, res) => {
  Compras.findAll().then((compras) => res.send(compras));
};

const comprasSingleUser = (req, res) => {
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
};

const comprasSingleProduct = (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
  }).then((product) => {
    const productId = product.id;
    Compras.findAll({
      where: {
        productId: productId,
      },
    }).then((compras) => res.send(compras));
  });
};

const checkout = (req, res) => {
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
            user: "al.lio.clothing.store@gmail.com", // email de gmail
            pass: "Allio.1346", //pass de gmail
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
};
module.exports = {
  allCompras,
  comprasSingleUser,
  comprasSingleProduct,
  checkout,
};
