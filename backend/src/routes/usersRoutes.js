const express = require("express");
const {
  loginUserController,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

// Rutas de usuarios
router.get("/usuarios", getUsers);
router.post("/usuarios", createUser);
router.put("/usuarios/:id", updateUser);
router.delete("/usuarios/:id", deleteUser);

// Registro y login
router.post("/register", createUser);
router.post("/login", loginUserController);

module.exports = router;
