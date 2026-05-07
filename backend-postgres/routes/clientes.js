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
  const { nome, telefone, endereco, empresa } = req.body;

  try {
    await repo.criarCliente(nome, telefone, empresa, endereco);
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

  try {

    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM clientes WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'Cliente não encontrado'
      });
    }

    res.json({
      message: 'Cliente deletado com sucesso'
    });

  } catch (error) {

    console.log('ERRO DELETE CLIENTE:', error);

    // Foreign Key PostgreSQL
    if (error.code === '23503') {

      return res.status(400).json({
        error: 'Não é possível deletar este cliente pois existem chamados vinculados.'
      });

    }

    res.status(500).json({
      error: 'Erro ao deletar cliente'
    });

  }

});
module.exports = router;