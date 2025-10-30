const { pool } = require("../db/connection");

async function getHabits(usuario_id) {
  const res = await pool.query(
    "SELECT * FROM habitos WHERE usuario_id = $1",
    [usuario_id]
  );
  return res.rows;
}

async function insertHabit(nombre, descripcion, usuario_id) {
  await pool.query(
    "INSERT INTO habitos (nombre, descripcion, usuario_id) VALUES ($1, $2, $3)",
    [nombre, descripcion, usuario_id]
  );
}

async function updateHabit(id, nombre, descripcion) {
  await pool.query(
    "UPDATE habitos SET nombre=$1, descripcion=$2 WHERE id=$3",
    [nombre, descripcion, id]
  );
}

async function deleteHabit(id) {
  await pool.query("DELETE FROM habitos WHERE id=$1", [id]);
}

async function toggleHabitDone(habito_id, dia_id, completado) {
  await pool.query(
    "UPDATE habitodias SET completado=$1 WHERE habito_id=$2 AND dia_id=$3",
    [completado, habito_id, dia_id]
  );
}

module.exports = {
  getHabits,
  insertHabit,
  updateHabit,
  deleteHabit,
  toggleHabitDone
};
