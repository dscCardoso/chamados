const pool = require('../database/db');

async function buscarUsuarioPorEmail(email) {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );

  return result.rows[0];
}

async function criarUsuario(email, senhaHash) {
  await pool.query(
    'INSERT INTO usuarios (email, senha) VALUES ($1, $2)',
    [email, senhaHash]
  );
}

module.exports = {
  buscarUsuarioPorEmail,
  criarUsuario,
};