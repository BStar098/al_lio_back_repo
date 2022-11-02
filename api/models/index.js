const User = require("./User");
const Product = require("./Product");
const Compras = require("./Compras");
const Reviews = require("./Reviews");

Product.belongsToMany(User, { through: "carrito" });
User.belongsToMany(Product, { through: "carrito" });

Product.belongsToMany(User, { through: Compras });
User.belongsToMany(Product, { through: Compras });

Product.belongsToMany(User, { through: Reviews });
User.belongsToMany(Product, { through: Reviews });

module.exports = { User, Product, Compras, Reviews };
