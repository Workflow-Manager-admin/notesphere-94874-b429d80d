require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',

  // MySQL config
  mysql: {
    host: process.env.MYSQL_URL || 'localhost',
    user: process.env.MYSQL_USER || 'user',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DB || 'notesdb',
    port: process.env.MYSQL_PORT || 3306,
  },

  // JWT secrets
  jwtSecret: process.env.JWT_SECRET || 'super-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '6h',
};
