/*const sql = require("mssql");
const dbConfig = require("../config/dbConfig");

let pool;

async function conectar() {
  try {
    console.log("🔄 Intentando conectar a SQL Server...");
    console.log("📋 Configuración:", {
      server: dbConfig.server,
      database: dbConfig.database,
      instanceName: dbConfig.options.instanceName,
      port: dbConfig.port
    });

    pool = await sql.connect(dbConfig);
    console.log("✅ Conectado a SQL Server exitosamente");
    console.log("📊 Pool de conexiones creado");

    // Test the connection with a simple query
    const result = await pool.request().query("SELECT 1 as test");
    console.log("🧪 Query de prueba exitosa:", result.recordset);

    // ❌ No cerramos el pool aquí
    // await pool.close();

    return pool; // devolvemos el pool por si se necesita
  } catch (err) {
    console.error("❌ Error de conexión:");
    console.error("📝 Detalles del error:", err.message);
    throw err;
  }
}

module.exports = {
  sql,
  conectar,
};*/

/*const sql = require("mssql");

const config = {
  server: "localhost",
  database: "Habitos_Proyecto",
  user: "ashira1",
  password: "Laura.24680",
  options: {
    trustServerCertificate: true
  }
};

let pool;

async function conectar() {
  if (!pool) {
    pool = await sql.connect(config);
    console.log("✅ Conectado a SQL Server y pool listo");
  }
  return pool;
}

// exportamos correctamente la función y sql
module.exports = { conectar, sql };*/

//Cambiamos a Postgres
const { Pool } = require("pg");
require("dotenv").config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL y pool listo"))
  .catch((err) => console.error("❌ Error de conexión a PostgreSQL:", err));

module.exports = { pool };
