// src/services/habitsService.js
const { conectar, sql } = require('../db/connection');

async function getHabits() {
  const pool = await conectar();
  const result = await pool.request().query("SELECT * FROM Habito");
  return result.recordset;
}

async function insertHabit(nombre, descripcion, dia, done) {
  const pool = await conectar();
  await pool.request()
    .input("Nombre", sql.VarChar, nombre)
    .input("Descripcion", sql.VarChar, descripcion)
    .input("Dia", sql.VarChar, dia)
    .input("Done", sql.Bit, done)
    .query("INSERT INTO Habito (Nombre, Descripcion, Dia, Done) VALUES (@Nombre, @Descripcion, @Dia, @Done)");
}

async function updateHabit(id, nombre, descripcion, dia, done) {
  const pool = await conectar();
  await pool.request()
    .input("ID_Habito", sql.Int, id)
    .input("Nombre", sql.VarChar, nombre)
    .input("Descripcion", sql.VarChar, descripcion)
    .input("Dia", sql.VarChar, dia)
    .input("Done", sql.Bit, done)
    .query("UPDATE Habito SET Nombre=@Nombre, Descripcion=@Descripcion, Dia=@Dia, Done=@Done WHERE ID_Habito=@ID_Habito");
}

async function deleteHabit(id) {
  const pool = await conectar();
  await pool.request()
    .input("ID_Habito", sql.Int, id)
    .query("DELETE FROM Habito WHERE ID_Habito=@ID_Habito");
}

module.exports = { getHabits, insertHabit, updateHabit, deleteHabit };
