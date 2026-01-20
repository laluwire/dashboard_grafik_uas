const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/mahasiswa', (req, res) => {
  // Query SQL untuk mengambil data asli dari database
  const sql = `
    SELECT p.nama_prodi, COUNT(m.id) AS total
    FROM mahasiswa m
    JOIN prodi p ON m.prodi_id = p.id
    GROUP BY p.nama_prodi
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json([]);
    }
    res.json(results);
  });
});

module.exports = router;