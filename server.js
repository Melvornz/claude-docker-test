const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER || 'testuser',
  password: process.env.POSTGRES_PASSWORD || 'testpassword',
  database: process.env.POSTGRES_DB || 'testdb',
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time, version() AS pg_version');
    res.json({
      status: 'ok',
      database: 'connected',
      current_time: result.rows[0].current_time,
      pg_version: result.rows[0].pg_version,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
