const S = require("sequelize");
const db = require("../db/config");

class Compras extends S.Model {}

Compras.init(
  { state: { type: S.STRING } },
  {
    sequelize: db,
    modelName: "compras",
  }
);

module.exports = Compras;
