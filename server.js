const express = require('express');
const app = express();
const db = require('./config/db');
const apiRoutes = require('./routes/api');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

// Koneksi database dibuat universal agar jalan di lokal maupun online 
db.connect((err) => {
  if (err) {
    console.error('Gagal koneksi DB:', err.message);
  } else {
    console.log('Database terhubung!');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
