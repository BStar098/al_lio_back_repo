const { Cart } = require("../models/index");

const getAll = async () => {
  const products = await Cart.findAll();
  return products;
};

module.exports = {getAll}