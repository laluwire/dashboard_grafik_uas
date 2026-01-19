const mysql = require('mysql2');
require('dotenv').config(); // Penting untuk membaca file .env

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dashboard_uas',
  port: process.env.DB_PORT || 3306
});

module.exports = connection;