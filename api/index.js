const express = require("express");
const morgan = require("morgan");
// const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

const routes = require("./routes");
const db = require("./config/db");

const PORT = 3001;

app.use(express.json());
app.use(cookieParser())

app.use(morgan("tiny"));
// app.use(express.static(__dirname + "/public"));

app.use("/api", routes);

// app.use("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

db.sync({force:false}).then(() => {
  app.listen(PORT, () => {
    console.log("Escuchando en el puerto ", PORT);
  });
});