const mysql = require('mysql2');
require('dotenv').config();

// Menggunakan Pool agar koneksi tidak gampang terputus (Closed State)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dashboard_uas',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export dalam bentuk promise agar lebih stabil
module.exports = pool;