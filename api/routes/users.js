const express = require("express");
const router = express.Router();
const { validateAuth } = require("../utils/auth");

const {
  createUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  setAdmin
} = require("../controllers/users");

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/:id", validateAuth, setAdmin)

router.put("/:id", updateUser);

router.delete("/:id", validateAuth, deleteUser);

router.get("/", validateAuth, getUsers)

router.get("/:id", validateAuth, getSingleUser);

module.exports = router;
