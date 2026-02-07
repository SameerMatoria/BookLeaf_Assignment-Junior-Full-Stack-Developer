const express = require('express');
const router = express.Router();
const withdrawalService = require('../services/withdrawalService');

router.post('/', (req, res) => {
  try {
    const { author_id, amount } = req.body;

    if (!author_id || !amount) {
      return res.status(400).json({
        error: 'Missing required fields: author_id and amount are required'
      });
    }

    if (!Number.isInteger(author_id) || author_id <= 0) {
      return res.status(400).json({
        error: 'author_id must be a positive integer'
      });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        error: 'amount must be a positive number'
      });
    }

    const result = withdrawalService.createWithdrawal(author_id, amount);

    if (!result.success) {
      return res.status(result.statusCode).json({ error: result.error });
    }

    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
