const db = require('./config/db');

console.log('--- Mengetes Koneksi Database ---');

// Melakukan query sederhana untuk cek koneksi
db.query('SELECT 1 + 1 AS result', (err, results) => {
  if (err) {
    console.error('KESALAHAN KONEKSI:', err.message);
    console.log('Pastikan MySQL sudah jalan dan data di .env sudah benar.');
  } else {
    console.log('KONEKSI BERHASIL!');
    console.log('Hasil test query (1+1):', results[0].result);
    console.log('Database siap digunakan.');
  }
  
  // Menutup koneksi setelah tes selesai
  db.end();
  process.exit();
});