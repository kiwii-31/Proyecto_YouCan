const { pool } = require("./connection");

async function db() {
  const client = await pool.connect();
  try {
    console.log("Creando tablas (si no existen)");

    // Tabla usuario
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(100) UNIQUE NOT NULL,
        edad INT,
        contrasena TEXT NOT NULL
      );
    `);

    // Tabla habito
    await client.query(`
      CREATE TABLE IF NOT EXISTS habito (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE
      );
    `);

    console.log("✅ Tablas creadas o ya existentes.");

    // Datos de ejemplo para usuario
    await client.query(`
      INSERT INTO usuario (nombre, correo, edad, contrasena)
      VALUES
        ('Juan Perez', 'juanperez@gmail.com', 25, '12345'),
        ('Maria Lopez', 'marialopez@gmail.com', 30, 'abcde'),
        ('Lucas Gomez', 'lucasgomez@gmail.com', 28, 'lucas123')
      ON CONFLICT (correo) DO NOTHING;
    `);

    // Datos de ejemplo para habito
    await client.query(`
      INSERT INTO habito (nombre, descripcion, usuario_id)
      VALUES
        ('Ejercicio', 'Hacer actividad fisica', 1),
        ('Lectura', 'Leer 30 minutos al dia', 2),
        ('Meditacion', 'Practicar relajacion', 3),
        ('Organizar tareas', 'Planificar el dia', 1)
      ON CONFLICT DO NOTHING;
    `);

    console.log("✅ Datos de ejemplo insertados correctamente.");
  } catch (err) {
    console.error("❌ Error al crear tablas o insertar datos:", err);
  } finally {
    client.release();
  }
}

module.exports = { db };
