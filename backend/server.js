const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./src/db/db');
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/tasks', taskRoutes);

// Ruta de prueba de conexión a la base de datos
app.get('/', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ message: 'Servidor y base de datos funcionando correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al conectar con la base de datos', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});