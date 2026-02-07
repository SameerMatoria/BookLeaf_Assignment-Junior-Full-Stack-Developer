const authors = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@email.com",
    bank_account: "1234567890",
    ifsc_code: "HDFC0001234"
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul@email.com",
    bank_account: "0987654321",
    ifsc_code: "ICIC0005678"
  },
  {
    id: 3,
    name: "Anita Desai",
    email: "anita@email.com",
    bank_account: "5678901234",
    ifsc_code: "SBIN0009012"
  }
];

const books = [
  {
    id: 1,
    title: "The Silent River",
    author_id: 1,
    royalty_per_sale: 45
  },
  {
    id: 2,
    title: "Midnight in Mumbai",
    author_id: 1,
    royalty_per_sale: 60
  },
  {
    id: 3,
    title: "Code & Coffee",
    author_id: 2,
    royalty_per_sale: 75
  },
  {
    id: 4,
    title: "Startup Diaries",
    author_id: 2,
    royalty_per_sale: 50
  },
  {
    id: 5,
    title: "Poetry of Pain",
    author_id: 2,
    royalty_per_sale: 30
  },
  {
    id: 6,
    title: "Garden of Words",
    author_id: 3,
    royalty_per_sale: 40
  }
];

const sales = [
  {
    id: 1,
    book_id: 1,
    quantity: 25,
    sale_date: "2025-01-05"
  },
  {
    id: 2,
    book_id: 1,
    quantity: 40,
    sale_date: "2025-01-12"
  },
  {
    id: 3,
    book_id: 2,
    quantity: 15,
    sale_date: "2025-01-08"
  },
  {
    id: 4,
    book_id: 3,
    quantity: 60,
    sale_date: "2025-01-03"
  },
  {
    id: 5,
    book_id: 3,
    quantity: 45,
    sale_date: "2025-01-15"
  },
  {
    id: 6,
    book_id: 4,
    quantity: 30,
    sale_date: "2025-01-10"
  },
  {
    id: 7,
    book_id: 5,
    quantity: 20,
    sale_date: "2025-01-18"
  },
  {
    id: 8,
    book_id: 6,
    quantity: 10,
    sale_date: "2025-01-20"
  }
];

module.exports = {
  authors,
  books,
  sales
};
