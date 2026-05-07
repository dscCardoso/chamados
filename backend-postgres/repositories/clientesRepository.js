const pool = require('../database/db');

async function listarClientes() {
  const result = await pool.query('SELECT * FROM clientes');
  return result.rows;
}

async function criarCliente(nome, telefone, empresa, endereco) {
  await pool.query(
    'INSERT INTO clientes (nome, telefone, empresa, endereco) VALUES ($1, $2, $3, $4)',
    [nome, telefone, empresa, endereco]
  );
}

module.exports = {
  listarClientes,
  criarCliente,
};