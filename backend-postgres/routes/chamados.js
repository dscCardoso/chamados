const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const repo = require('../repositories/chamadosRepository');
const pool = require('../database/db');

// 📌 LISTAR CHAMADOS
router.get('/', async (req, res) => {
  try {
    const chamados = await repo.listarChamados();
    console.log("CHAMADOS DO BANCO:", chamados);
    res.json(chamados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 📌 CRIAR CHAMADO
router.post('/', async (req, res) => {
  console.log('BODY RECEBIDO:', req.body);
  const { descricao, status, cliente_id } = req.body;

  try {
    await repo.criarChamado(descricao, status, cliente_id);
    res.status(201).json({ mensagem: 'Chamado criado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log("ID RECEBIDO:", id);

    const result = await pool.query(
      'DELETE FROM chamados WHERE id = $1 RETURNING *',
      [Number(id)]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Chamado não encontrado' });
    }

    res.json({
      message: 'Chamado deletado com sucesso',
      chamado: result.rows[0]
    });

  } catch (error) {
    console.log("ERRO AO DELETAR:", error); // 👈 IMPORTANTE
    res.status(500).json({ error: 'Erro ao deletar chamado' });
  }
});

module.exports = router;