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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
