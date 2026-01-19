const express = require('express');
const router = express.Router();
const db = require('../config/db');

// API: jumlah mahasiswa per prodi
router.get('/mahasiswa', (req, res) => {
  const sql = `
    SELECT p.nama_prodi, COUNT(m.id) AS total
    FROM mahasiswa m
    JOIN prodi p ON m.prodi_id = p.id
    GROUP BY p.nama_prodi
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

module.exports = router;
