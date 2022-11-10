const { Cart } = require("../models/index");
const { getAll } = require("../services/cart-services");

const addProductToCart = (req, res) => {
  Cart.create(req.body).then((result) => res.send(result)); //pasar en el body productId, userId, quantity
};

const removeProductFromCart = (req, res) => {
  const { userId, productId } = req.params;
  Cart.destroy({
    where: { userId, productId }, //pasar en el body productId, userId
  }).then(res.sendStatus(204));
};

const updateQuantity = (req, res) => {
  //pasar en el body productId, userId, quantity
  const { productId, userId, quantity } = req.body;

  Cart.findOne({ where: { productId, userId } })
    .then((cart) => {
      cart.updateFinalPrice(productId, userId, quantity).then((finalCart) => {
        res.send(finalCart[1]);
      });
    })
    .catch((err) => console.error(err));
};

const getProducts = async (req, res, next) => {
  const { id } = req.params;
  try {
    const products = await getAll(id);
    res.send(products);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
  getProducts,
};
