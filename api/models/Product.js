const S = require("sequelize");
const db = require("../db/config");

class Product extends S.Model {}

Product.init(
  {
    name: {
      type: S.STRING,
    },
    colour: {
      type: S.STRING,
    },
    size: {
      type: S.STRING,
    },
    price: {
      type: S.INTEGER,
      allowNull: false,
    },
    stock: {
      type: S.INTEGER,
    },
    category: {
      type: S.STRING,
    },
    description: {
      type: S.TEXT,
    },
    img: { 
      type: S.ARRAY(S.STRING) 
    },
    rating: { 
      type: S.INTEGER 
    },
  },
  {
    sequelize: db,
    modelName: "product",
  }
);

module.exports = Product;
