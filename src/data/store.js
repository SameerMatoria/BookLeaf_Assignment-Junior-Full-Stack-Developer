const { authors, books, sales } = require('../config/seedData');

const store = {
  authors: [...authors],
  books: [...books],
  sales: [...sales],
  withdrawals: [],
  nextWithdrawalId: 1
};

module.exports = store;
