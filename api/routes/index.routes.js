const express = require ('express')
const router = express.Router()
const { Products } = require("../models/Products")

    router.get("/", (req, res,next) => {
            Pages.findAll()
              .then((products) => res.send(products))
              .catch(next);
          });


      router.get("/:name", (req, res) => {
        Products.findOne({
         where:{
          name: req.params.name,
          }})
          .then((products) => res.send(products))
        });


          router.get("/search/:rating", (req, res) => {
         Products.findOne({
            where: {
                rating: req.params.rating
            }
         }) 
         .then(products => res.send(products))
        });

        router.get("/search/:price", (req, res) => {
            Products.findOne({
               where: {
                   price: req.params.price
               }
            }) 
            .then(products => res.send(products))
           });
   


           router.post("/:name", (req,res)  =>  {
        

            Products.Create(req.body)

            .then((products) => res.send(products))
            .catch((err) => {
                console.log(err);
           })});
        
           router.delete("/:id", (req, res, next) => {
            Products.destroy({
                where: {
                    id: req.params.id,
                }
            })
            .then(() => res.sendStatus(202))
            .catch(next);
           });

           
           router.put("/:id", (req,res, next) => {
            Products.update(req.body, {
                where: {
                    name: req.params.name,
                },
                returning: true,
            })
            .then((products) => res.send(products))
           });



