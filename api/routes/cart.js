const express = require("express");
const router = express.Router();
const { addProductToCart, removeProductFromCart, updateQuantity, getProducts } = require("../controllers/cart");

router.post("/", addProductToCart);

router.delete("/", removeProductFromCart);

router.put("/", updateQuantity)

router.get("/", getProducts)

module.exports = router;
