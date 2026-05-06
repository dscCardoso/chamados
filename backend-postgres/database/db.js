const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chamados_ti',
  password: '15304560'
});

module.exports = pool;