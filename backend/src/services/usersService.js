const { pool } = require("../db/connection");

async function getUsuarios() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM usuario");
    return res.rows;
  } finally {
    client.release();
  }
}

async function registrarUsuario(nombre, correo, edad, contraseña) {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO usuario (nombre, correo, edad, contraseña)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (correo) DO NOTHING`,
      [nombre, correo, edad, contraseña]
    );
  } finally {
    client.release();
  }
}

async function updateUser(id, nombre, correo, edad) {
  const client = await pool.connect();
  try {
    await client.query(
      `UPDATE usuario
       SET nombre = $1, correo = $2, edad = $3
       WHERE id = $4`,
      [nombre, correo, edad, id]
    );
  } finally {
    client.release();
  }
}

async function deleteUser(id) {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM usuario WHERE id = $1", [id]);
  } finally {
    client.release();
  }
}

async function loginUser(correo, contraseña) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM usuario WHERE correo = $1 AND contraseña = $2`,
      [correo, contraseña]
    );
    return res.rows[0] || null;
  } finally {
    client.release();
  }
}

module.exports = {
  getUsuarios,
  registrarUsuario,
  updateUser,
  deleteUser,
  loginUser,
};
