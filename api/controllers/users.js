const { generateToken } = require("../config/tokens");
const { User } = require("../models/index");

const createUser = (req, res) => {
  User.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(err => console.error(err));
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then(user => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then(isValid => {
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

const getUsers = (req, res) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(err => console.error(err))
};

const getSingleUser = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => res.send(user))
    .catch(err => console.error(err));
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
    .catch(err => console.error(err));
};

const deleteUser = (req, res) => { 
    User.destroy({ where: { id: req.params.id } })
        .then(res.sendStatus(204))
        .catch(err => console.error(err))
};

const setAdmin = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      user.type = "admin";
      res.send(user);
    })
    .catch(err => console.error(err));
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  setAdmin,
};
