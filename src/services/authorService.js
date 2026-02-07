const store = require('../data/store');

function calculateTotalEarnings(authorId) {
  const authorBooks = store.books.filter(book => book.author_id === authorId);
  const bookIds = authorBooks.map(book => book.id);

  const bookSales = store.sales.filter(sale => bookIds.includes(sale.book_id));

  let totalEarnings = 0;
  for (const sale of bookSales) {
    const book = authorBooks.find(b => b.id === sale.book_id);
    const earnings = sale.quantity * book.royalty_per_sale;
    totalEarnings += earnings;
  }

  return totalEarnings;
}

function calculateCurrentBalance(authorId) {
  const totalEarnings = calculateTotalEarnings(authorId);

  const authorWithdrawals = store.withdrawals.filter(w => w.author_id === authorId);
  const totalWithdrawals = authorWithdrawals.reduce((sum, w) => sum + w.amount, 0);

  return totalEarnings - totalWithdrawals;
}

function getAllAuthors() {
  return store.authors.map(author => ({
    id: author.id,
    name: author.name,
    email: author.email,
    total_earnings: calculateTotalEarnings(author.id),
    current_balance: calculateCurrentBalance(author.id)
  }));
}

function getAuthorById(authorId) {
  const author = store.authors.find(a => a.id === authorId);

  if (!author) {
    return null;
  }

  const authorBooks = store.books.filter(book => book.author_id === authorId);

  const booksWithStats = authorBooks.map(book => {
    const bookSales = store.sales.filter(sale => sale.book_id === book.id);

    const totalSold = bookSales.reduce((sum, sale) => sum + sale.quantity, 0);

    const totalRoyalty = totalSold * book.royalty_per_sale;

    return {
      id: book.id,
      title: book.title,
      royalty_per_sale: book.royalty_per_sale,
      total_sold: totalSold,
      total_royalty: totalRoyalty
    };
  });

  return {
    id: author.id,
    name: author.name,
    email: author.email,
    bank_account: author.bank_account,
    ifsc_code: author.ifsc_code,
    total_earnings: calculateTotalEarnings(authorId),
    current_balance: calculateCurrentBalance(authorId),
    total_books: authorBooks.length,
    books: booksWithStats
  };
}

function getAuthorSales(authorId) {
  const authorBooks = store.books.filter(book => book.author_id === authorId);
  const bookIds = authorBooks.map(book => book.id);

  const bookSales = store.sales.filter(sale => bookIds.includes(sale.book_id));

  const salesWithDetails = bookSales.map(sale => {
    const book = authorBooks.find(b => b.id === sale.book_id);
    return {
      id: sale.id,
      book_id: sale.book_id,
      book_title: book.title,
      quantity: sale.quantity,
      royalty_earned: sale.quantity * book.royalty_per_sale,
      sale_date: sale.sale_date
    };
  });

  salesWithDetails.sort((a, b) => {
    return b.sale_date.localeCompare(a.sale_date);
  });

  return salesWithDetails;
}

function authorExists(authorId) {
  return store.authors.some(a => a.id === authorId);
}

module.exports = {
  calculateTotalEarnings,
  calculateCurrentBalance,
  getAllAuthors,
  getAuthorById,
  getAuthorSales,
  authorExists
};
