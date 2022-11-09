const { Cart } = require("../models/index");
const {getAll} = require("../services/cart-services")

const addProductToCart = (req, res) => {
  Cart.create(req.body).then(result => res.send(result)); //pasar en el body productId, userId, quantity
};

const removeProductFromCart = (req, res) => {
  Cart.destroy({ 
    where: { userId: req.body.userId, productId: req.body.productId }, //pasar en el body productId, userId
  })
    .then(res.sendStatus(204));
};

const updateQuantity = (req, res) => {  //pasar en el body productId, userId, quantity
  Cart.update(
    { quantity: req.body.quantity },
    {
      where: {
        productId: req.body.productId,
        userId: req.body.userId,
      },
      returning: true,
    }
  )
    .then(([affectedRows, updated]) => {
      res.send(updated[0]);
    })
    .catch(err => console.error(err));
};

const getProducts = async (req, res, next) => {
 try{
  const products = await getAll()
  res.send(products)
 }catch(err){
  next(err)
 }
}

module.exports = { addProductToCart, removeProductFromCart, updateQuantity, getProducts };
