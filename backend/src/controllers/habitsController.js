// src/controllers/habitsController.js
const { getHabits, insertHabit, updateHabit, deleteHabit } = require('../services/habitsService');

const getAllHabits = async (req, res) => {
  try {
    const habits = await getHabits();
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener habitos" });
  }
};

const createHabit = async (req, res) => {
  try {
    const { Nombre, Descripcion, Dia, Done } = req.body;
    if (!Nombre || !Dia) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    await insertHabit(Nombre, Descripcion || "", Dia, Done || false);
    res.json({ mensaje: "Habito creado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear habito" });
  }
};

const updateHabitController = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion, Dia, Done } = req.body;

    if (!Nombre || !Dia) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    await updateHabit(id, Nombre, Descripcion || "", Dia, Done || false);
    res.json({ mensaje: "Habito actualizado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar habito" });
  }
};

const deleteHabitController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteHabit(id);
    res.json({ mensaje: "Habito eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar habito" });
  }
};

module.exports = { getAllHabits, createHabit, updateHabitController, deleteHabitController };
