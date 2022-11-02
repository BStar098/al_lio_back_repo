const { generateToken } = require("../config/tokens");
const User = require("../models/User");

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => console.error(err));
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        type: user.type,
      };
      const token = generateToken(payload);
      res.cookie("token", token);
      res.send(payload);
    });
  });
};

const logOutUser = (req, res) => {
  res.clearCookie("token").sendStatus(204);
};

const getUsers = (req, res) => {
  req.user.type === "admin"
    ? User.findAll()
        .then((users) => res.send(users))
        .catch((err) => console.error(err))
    : res.send("Debe ser administrador para visualizar todos los usuarios");
};

const getSingleUser = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.send(user))
    .catch((err) => console.error(err));
};

const updateUser = (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(([affectedRows, updated]) => {
      const user = updated[0];
      res.send(user);
    })
    .catch((err) => console.error(err));
};

const deleteUser = (req, res) => {
  req.user.type === "admin"
    ? User.destroy({ where: { id: req.params.id } })
        .then(res.sendStatus(204))
        .catch((err) => console.error(err))
    : res.send("Debe ser administrador para eliminar un usuario");
};

const setAdmin = (req, res) => {
  //req.user.type === "admin" ?
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      user.type = "admin";
      res.send(user);
    })
    .catch((err) => console.error(err));
  //: res.send("Debe ser administrador para asignarle permisos a un usuario");
};

module.exports = {
  createUser,
  loginUser,
  logOutUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  setAdmin,
};
