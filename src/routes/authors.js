const express = require('express');
const router = express.Router();
const authorService = require('../services/authorService');

router.get('/', (req, res) => {
  try {
    const authors = authorService.getAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const authorId = parseInt(req.params.id);

    if (isNaN(authorId) || authorId <= 0) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }

    const author = authorService.getAuthorById(authorId);

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/sales', (req, res) => {
  try {
    const authorId = parseInt(req.params.id);

    if (isNaN(authorId) || authorId <= 0) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }

    if (!authorService.authorExists(authorId)) {
      return res.status(404).json({ error: 'Author not found' });
    }

    const sales = authorService.getAuthorSales(authorId);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/withdrawals', (req, res) => {
  try {
    const authorId = parseInt(req.params.id);

    if (isNaN(authorId) || authorId <= 0) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }

    if (!authorService.authorExists(authorId)) {
      return res.status(404).json({ error: 'Author not found' });
    }

    const withdrawalService = require('../services/withdrawalService');
    const withdrawals = withdrawalService.getAuthorWithdrawals(authorId);
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
