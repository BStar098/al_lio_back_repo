const express = require("express");
const router = express.Router();
const users = require("./users");
const products = require("./products");
const checkout = require("./checkout");

router.use("/users", users);
router.use("/products", products);
router.use("/checkout", checkout);
module.exports = router;
