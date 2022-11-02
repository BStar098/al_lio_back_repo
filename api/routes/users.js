const express = require("express");
const router = express.Router();
const { validateAuth } = require("../utils/auth");

const {
  createUser,
  loginUser,
  logOutUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  setAdmin
} = require("../controllers/users");

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/logout", logOutUser);

router.post("/:id", validateAuth, setAdmin)

router.put("/:id", updateUser);

router.delete("/:id", validateAuth, deleteUser);

router.get("/", validateAuth, getUsers)

//ruta para la persistencia de la sesion en la pagina. Valida el token de la cookie a traves del middleware "validateAuth" y retorna los datos que esten guardados en el payload de la cookie
router.get("/me", validateAuth, (req, res) => {
  req.user ? res.send(req.user) : res.sendStatus(404)
});

module.exports = router;
