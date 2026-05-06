const pool = require('../database/db');

// listar chamados com cliente
async function listarChamados() {
  const result = await pool.query(`
    SELECT chamados.*, clientes.nome AS cliente_nome
    FROM chamados
    JOIN clientes ON chamados.cliente_id = clientes.id
  `);

  return result.rows;
}

// criar chamado
async function criarChamado(descricao, status, cliente_id) {
  await pool.query(
    'INSERT INTO chamados (descricao, status, cliente_id) VALUES ($1, $2, $3)',
    [descricao, status, cliente_id]
  );
}

module.exports = {
  listarChamados,
  criarChamado,
};