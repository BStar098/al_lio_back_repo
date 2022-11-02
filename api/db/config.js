const Sequelize = require("sequelize");

const db = new Sequelize("al_lio", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
