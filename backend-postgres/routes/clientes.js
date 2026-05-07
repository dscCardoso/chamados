const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const auth = require('../middleware/auth');
const repo = require('../repositories/clientesRepository');

// listar clientes
router.get('/', auth, async (req, res) => {
  try {
    const clientes = await repo.listarClientes();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// criar cliente
router.post('/', auth, async (req, res) => {
  const { nome, telefone } = req.body;

  try {
    await repo.criarCliente(nome, telefone);
    res.status(201).json({ mensagem: 'Cliente criado' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;