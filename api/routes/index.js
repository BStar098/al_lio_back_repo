const express = require("express");
const router = express.Router();
const users = require("./users");
const products = require("./products");
const cart = require("./cart")
const checkout = require("./checkout");

router.use("/users", users);
router.use("/products", products);
router.use("/checkout", checkout);
router.use("/cart", cart);



module.exports = router;
