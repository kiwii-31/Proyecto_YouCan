//  # datos de conexión MSSQL
/*module.exports = {
  server: "localhost",               // 👈 Usar localhost
  port: 3000,                       // 👈 Puerto dinámico de SQL Express
  database: "Habitos_proyecto",
  user: "ashira1",                        // 👈 Usuario SQL Server
  password: "Laura.24680",              // 👈 Contraseña SQL Server
  options: {
    encrypt: true,                   // 👈 Cambiar a true porque en SSMS está "Mandatory"
    trustServerCertificate: true,    // 👈 Mantener como true
    enableArithAbort: true,          // 👈 Opción adicional para estabilidad
    connectionTimeout: 30000,        // 👈 Aumentar timeout
    requestTimeout: 30000            // 👈 Aumentar timeout
  }
};
*/


const sql = require("mssql");

const config = {
  server: "localhost",
  database: "Habitos_Proyecto",
  user: "ashira1",
  password: "Laura.24680",
  port: 1433,
  options: {
    trustServerCertificate: true
  }
};

module.exports = { sql, config };
