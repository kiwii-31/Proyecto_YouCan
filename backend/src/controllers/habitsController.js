const {
  getHabits,
  insertHabit,
  updateHabit,
  deleteHabit,
  toggleHabitDone
} = require("../services/habitsService");

// Obtener todos los habitos de un usuario
const getAllHabits = async (req, res) => {
  try {
    const usuario_id = req.query.usuario_id;
    if (!usuario_id) return res.status(400).json({ error: "Falta usuario_id" });

    const habits = await getHabits(usuario_id);
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener habitos" });
  }
};

// Crear habito
const createHabit = async (req, res) => {
  try {
    const { nombre, descripcion, usuario_id } = req.body;
    if (!nombre || !usuario_id)
      return res.status(400).json({ error: "Falta nombre o usuario_id" });

    await insertHabit(nombre, descripcion, usuario_id);
    res.json({ mensaje: "Habito creado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear habito" });
  }
};

// Actualizar habito
const updateHabitController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    await updateHabit(id, nombre, descripcion);
    res.json({ mensaje: "Habito actualizado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar habito" });
  }
};


// Eliminar habito
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


const toggleHabitDoneController = async (req, res) => {
  try {
    const { habito_id, dia_id } = req.params;
    const { completado } = req.body;
    await toggleHabitDone(habito_id, dia_id, completado);
    res.json({ mensaje: "Habito actualizado completado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar completado" });
  }
};

module.exports = {
  getAllHabits,
  createHabit,
  updateHabitController,
  deleteHabitController,
  toggleHabitDoneController
};
