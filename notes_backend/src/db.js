const mysql = require('mysql2/promise');
const config = require('./config');

let pool;

/**
 * PUBLIC_INTERFACE
 * Get a MySQL connection pool instance.
 */
async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database,
      port: config.mysql.port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

module.exports = { getPool };
