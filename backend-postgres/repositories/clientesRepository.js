const pool = require('../database/db');

async function listarClientes() {
  const result = await pool.query('SELECT * FROM clientes');
  return result.rows;
}

async function criarCliente(nome, telefone) {
  await pool.query(
    'INSERT INTO clientes (nome, telefone) VALUES ($1, $2)',
    [nome, telefone]
  );
}

module.exports = {
  listarClientes,
  criarCliente,
};