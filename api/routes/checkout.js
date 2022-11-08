const express = require("express");
const router = express.Router();
const { Compras, User, Product, Cart } = require("../models/index");

const {
  allCompras,
  comprasSingleUser,
  comprasSingleProduct,
  checkout,
} = require("../controllers/checkout");

//todas las compras
router.get("/", allCompras);

//todas las compras de un solo usuario
router.get("/search/:id", comprasSingleUser);

//todas las compras de un solo producto
router.get("/search/products/:id", comprasSingleProduct);

//para enviar el mail
//confirmacion de compra con todos los datos de la compra
router.post("/send", checkout);

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

module.exports = router;
