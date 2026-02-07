const store = require('../data/store');
const { calculateCurrentBalance, authorExists } = require('./authorService');

function createWithdrawal(authorId, amount) {
  if (!authorExists(authorId)) {
    return {
      success: false,
      statusCode: 404,
      error: "Author not found"
    };
  }

  if (amount < 500) {
    return {
      success: false,
      statusCode: 400,
      error: "Amount must be at least ₹500"
    };
  }

  const currentBalance = calculateCurrentBalance(authorId);

  if (amount > currentBalance) {
    return {
      success: false,
      statusCode: 400,
      error: `Insufficient balance. Current balance: ₹${currentBalance}`
    };
  }

  const withdrawal = {
    id: store.nextWithdrawalId++,
    author_id: authorId,
    amount: amount,
    status: "pending",
    created_at: new Date().toISOString().split('T')[0]
  };

  store.withdrawals.push(withdrawal);

  const newBalance = currentBalance - amount;

  return {
    success: true,
    statusCode: 201,
    data: {
      ...withdrawal,
      new_balance: newBalance
    }
  };
}

function getAuthorWithdrawals(authorId) {
  const authorWithdrawals = store.withdrawals.filter(w => w.author_id === authorId);

  authorWithdrawals.sort((a, b) => {
    return b.created_at.localeCompare(a.created_at);
  });

  return authorWithdrawals;
}

module.exports = {
  createWithdrawal,
  getAuthorWithdrawals
};
