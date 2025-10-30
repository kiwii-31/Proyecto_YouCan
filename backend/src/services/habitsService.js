const { pool } = require("../db/connection");

async function getHabits(usuario_id) {
  const res = await pool.query(
    "SELECT h.*, c.nombre AS categoria_nombre FROM Habitos h LEFT JOIN Categorias c ON h.categoria_id = c.id WHERE h.usuario_id = $1",
    [usuario_id]
  );
  return res.rows;
}

async function insertHabit(nombre, descripcion, usuario_id, categoria_id = null) {
  await pool.query(
    "INSERT INTO Habitos (nombre, descripcion, usuario_id, categoria_id) VALUES ($1, $2, $3, $4)",
    [nombre, descripcion, usuario_id, categoria_id]
  );
}

async function updateHabit(id, nombre, descripcion, categoria_id) {
  await pool.query(
    "UPDATE Habitos SET nombre=$1, descripcion=$2, categoria_id=$3 WHERE id=$4",
    [nombre, descripcion, categoria_id, id]
  );
}

async function deleteHabit(id) {
  await pool.query("DELETE FROM Habitos WHERE id=$1", [id]);
}

async function toggleHabitDone(habito_id, dia_id, completado) {

  await pool.query(
    "UPDATE HabitosDias SET completado=$1 WHERE habito_id=$2 AND dia_id=$3",
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
