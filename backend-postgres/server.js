require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./database/db');
const clientesRoutes = require('./routes/clientes');
const chamadosRoutes = require('./routes/chamados');
const authRoutes = require('./routes/auth');
const app = express();
const auth = require('./middleware/auth');

// middlewares
app.use(cors());
app.use(express.json());
app.use('/clientes', clientesRoutes);
app.use('/chamados', chamadosRoutes);
app.use('/auth', authRoutes);

app.get('/health', auth, (req, res) => {
  res.json({ status: 'ok' });
});

// rota teste
app.get('/health', auth, (req, res) => {
  res.send('API PostgreSQL rodando 🚀');
});
    
app.get('/teste-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// subir servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

