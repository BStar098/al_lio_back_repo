const express = require("express");
const router = express.Router();
const { Product } = require("../models/index");

router.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => res.send(products))
    .catch(next);
});

router.get("/search", (req, res) => {
  Product.findOne({
    where: req.body,
  })
    .then((products) => res.send(products))
    .catch((err) => console.log(err));
});

router.get("/:name", (req, res) => {
  Product.findOne({
    where: {
      name: req.params.name,
    },
  }).then((products) => res.send(products));
});

router.post("/", (req, res) => {
  Product.create(req.body)
    .then((products) => res.send(products))
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(202))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  }).then(([filas, products]) => res.send(products[0]));
});

module.exports = router;
