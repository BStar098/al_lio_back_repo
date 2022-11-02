const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 3001;
const db = require("./db/config");
const models = require("./models/index");
//const routes = require ("")

app.use(express.json());
app.use(morgan);
app.use(express.static("src"));

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log("Escuchando en el puerto ", port);
  });
});

