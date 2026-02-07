const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authorsRouter = require('./routes/authors');
const withdrawalsRouter = require('./routes/withdrawals');

app.use('/authors', authorsRouter);
app.use('/withdrawals', withdrawalsRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'BookLeaf Author Royalty System API',
    version: '1.0.0',
    endpoints: {
      'GET /authors': 'List all authors with earnings and balance',
      'GET /authors/:id': 'Get detailed author information',
      'GET /authors/:id/sales': 'Get all sales for an author',
      'GET /authors/:id/withdrawals': 'Get all withdrawals for an author',
      'POST /withdrawals': 'Create a withdrawal request'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
