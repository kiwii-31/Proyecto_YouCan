const {
  getUsuarios,
  registrarUsuario,
  updateUser,
  deleteUser,
  loginUser,
} = require("../services/usersService");

const getUsers = async (req, res) => {
  try {
    const usuarios = await getUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const createUser = async (req, res) => {
  try {
    const { nombre, correo, edad, contraseña } = req.body;
    await registrarUsuario(nombre, correo, edad, contraseña);
    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, edad } = req.body;
    await updateUser(id, nombre, correo, edad);
    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const user = await loginUser(correo, contraseña);
    if (!user) return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser: updateUserController,
  deleteUser: deleteUserController,
  loginUserController,
};
