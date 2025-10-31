const { pool } = require("../db/connection");

async function getHabits(usuario_id) {
  const res = await pool.query(`
    SELECT 
      h.id AS habito_id,
      h.nombre AS habito_nombre,
      h.descripcion,
      d.id AS dia_id,
      d.nombre AS dia_nombre,
      hd.completado
    FROM habitos h
    JOIN habitodias hd ON h.id = hd.habito_id
    JOIN dias d ON d.id = hd.dia_id
    WHERE h.usuario_id = $1
    ORDER BY h.id, d.id;
  `, [usuario_id]);

  const habitsMap = {};

  res.rows.forEach(row => {
    if (!habitsMap[row.habito_id]) {
      habitsMap[row.habito_id] = {
        id: row.habito_id,
        nombre: row.habito_nombre,
        descripcion: row.descripcion,
        dias: [],
        dias_detalle: []
      };
    }

    habitsMap[row.habito_id].dias.push(row.dia_nombre);
    habitsMap[row.habito_id].dias_detalle.push({
      id: row.dia_id,
      nombre: row.dia_nombre,
      completado: row.completado
    });
  });

  return Object.values(habitsMap);
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
