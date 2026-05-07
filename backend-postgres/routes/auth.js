const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 📌 REGISTRO
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
      [nome, email, senhaHash]
    );

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 LOGIN
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const user = result.rows[0];

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(400).json({ error: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: user.id },
      'process.env.JWT_SECRET',
      { expiresIn: '1d' }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;