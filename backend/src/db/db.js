const { pool } = require("./connection");

async function db() {
  const client = await pool.connect();
  try {
    console.log("Creando tablas (si no existen)");

    // Crear tabla usuario
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(100) UNIQUE NOT NULL,
        edad INT,
        contraseña TEXT NOT NULL
      );
    `);

    // Crear tabla habitos
    await client.query(`
      CREATE TABLE IF NOT EXISTS habitos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE
      );
    `);

    // Crear tabla dias
    await client.query(`
      CREATE TABLE IF NOT EXISTS dias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(20) UNIQUE NOT NULL
      );
    `);

    // Insertar dias si no existen
    await client.query(`
      INSERT INTO dias (nombre)
      VALUES ('lunes'), ('martes'), ('miercoles'), ('jueves'), ('viernes'), ('sabado'), ('domingo')
      ON CONFLICT (nombre) DO NOTHING;
    `);

    // Crear tabla habitodias
    await client.query(`
      CREATE TABLE IF NOT EXISTS habitodias (
        id SERIAL PRIMARY KEY,
        habito_id INT REFERENCES habitos(id) ON DELETE CASCADE,
        dia_id INT REFERENCES dias(id) ON DELETE CASCADE,
        completado BOOLEAN DEFAULT false
      );
    `);

    console.log("✅ Tablas creadas o ya existentes.");

    // Insertar datos de ejemplo en usuario
    await client.query(`
      INSERT INTO usuario (nombre, correo, edad, contraseña)
      VALUES
        ('Juan Pérez', 'juanperez@gmail.com', 25, '12345'),
        ('María López', 'marialopez@gmail.com', 30, 'abcde'),
        ('Lucas Gómez', 'lucasgomez@gmail.com', 28, 'lucas123')
      ON CONFLICT (correo) DO NOTHING;
    `);

    // Insertar datos de ejemplo en habitos
    await client.query(`
      INSERT INTO habitos (nombre, descripcion, usuario_id)
      VALUES
        ('Ejercicio', 'Realizar actividad física diaria', 1),
        ('Lectura', 'Leer al menos 30 minutos al día', 2),
        ('Meditación', 'Practicar relajación y mindfulness', 3),
        ('Organizar tareas', 'Planificar las tareas del día', 1)
      ON CONFLICT DO NOTHING;
    `);

    // Insertar ejemplo en habitodias
    await client.query(`
      INSERT INTO habitodias (habito_id, dia_id)
      VALUES
        (1, 1),
        (1, 3),
        (2, 2),
        (2, 4),
        (3, 5),
        (4, 1),
        (4, 2)
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
