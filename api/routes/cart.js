const express = require("express");
const router = express.Router();
const { addProductToCart, removeProductFromCart, updateQuantity } = require("../controllers/cart");

router.post("/", addProductToCart);

router.delete("/", removeProductFromCart);

router.put("/", updateQuantity)

module.exports = router;
