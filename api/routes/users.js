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
  setAdminis
} = require("../controllers/users");

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/:id", setAdminis)

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/", getUsers)

router.get("/:id", getSingleUser);

module.exports = router;
