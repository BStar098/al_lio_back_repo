const S = require("sequelize");
const db = require("../db/config");

const Product = require("./Product");

class Cart extends S.Model {}

Cart.init(
  {
    quantity: {
      type: S.INTEGER,
    },
    finalPrice: {
      type: S.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "cart",
  }
);

Cart.beforeCreate(async newProduct => {
  const product = await Product.findOne({
    where: { id: newProduct.productId },
  });
  return (newProduct.finalPrice = product.price * newProduct.quantity);
});

module.exports = Cart;
