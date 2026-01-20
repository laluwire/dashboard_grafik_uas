const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/mahasiswa', (req, res) => {

  if (process.env.RAILWAY_ENVIRONMENT) {
    return res.json([
      { nama_prodi: 'Informatika', total: 40 },
      { nama_prodi: 'Sistem Informasi', total: 30 },
      { nama_prodi: 'Teknik Komputer', total: 20 }
    ]);
  }

  const sql = `
    SELECT p.nama_prodi, COUNT(m.id) AS total
    FROM mahasiswa m
    JOIN prodi p ON m.prodi_id = p.id
    GROUP BY p.nama_prodi
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.json([]); // ⬅️ PENTING: balikin array
    }
    res.json(results);
  });
});

module.exports = router;
