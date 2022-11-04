const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 3001;
const db = require("./db/config");
const cookieParser = require("cookie-parser");
const models = require("./models/index");
const routes = require("./routes/index");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.static("src"));

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log("Escuchando en el puerto ", port);
  });
});
