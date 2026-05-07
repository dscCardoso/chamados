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

// atualizar cliente
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, empresa, endereco } = req.body;

  try {
    const result = await pool.query(
      `UPDATE clientes
       SET nome = $1,
           telefone = $2,
           empresa = $3,
           endereco = $4
       WHERE id = $5
       RETURNING *`,
      [nome, telefone, empresa, endereco, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// deletar cliente
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'DELETE FROM clientes WHERE id = $1',
      [id]
    );

    res.json({
      mensagem: 'Cliente deletado'
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;