// src/app.js
const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
require("dotenv").config();

// RUTAS
const habitsRoutes = require("./routes/habitsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// USO DE RUTAS
app.use("/api/habits", habitsRoutes);
app.use("/api/users", usersRoutes);

// RUTA DE TEST
app.get("/", (req, res) => {
  res.send("✅ Backend funcionando");
});

db();
// SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
