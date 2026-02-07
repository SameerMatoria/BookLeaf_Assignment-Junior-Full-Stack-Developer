# BookLeaf Author Royalty System API

A REST API for managing author royalties, book sales, and withdrawal requests for BookLeaf Publishing.

## Tech Stack

**Node.js with Express** - Chosen for its simplicity, extensive ecosystem, and excellent support for building REST APIs quickly. Express provides a minimal yet flexible framework that's perfect for this use case.

**In-Memory Storage** - Using JavaScript objects to store data, making deployment simple without requiring database setup.

**CORS Enabled** - Allows the API to be accessed from any origin, which is required for automated testing.

## Features

- Track author earnings from book sales
- View detailed sales history
- Process withdrawal requests with validation
- Calculate royalties automatically
- RESTful API design with proper HTTP status codes

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### 1. GET /authors
Returns a list of all authors with their total earnings and current balance.

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "Priya Sharma",
    "email": "priya@email.com",
    "total_earnings": 3825,
    "current_balance": 3825
  }
]
```

### 2. GET /authors/:id
Returns detailed information about a specific author, including their books and sales statistics.

**Response Example:**
```json
{
  "id": 1,
  "name": "Priya Sharma",
  "email": "priya@email.com",
  "bank_account": "1234567890",
  "ifsc_code": "HDFC0001234",
  "total_earnings": 3825,
  "current_balance": 3825,
  "total_books": 2,
  "books": [
    {
      "id": 1,
      "title": "The Silent River",
      "royalty_per_sale": 45,
      "total_sold": 65,
      "total_royalty": 2925
    }
  ]
}
```

**Error Responses:**
- `404 Not Found` - Author doesn't exist
- `400 Bad Request` - Invalid author ID format

### 3. GET /authors/:id/sales
Returns all sales for an author's books, sorted by date (newest first).

**Response Example:**
```json
[
  {
    "id": 2,
    "book_id": 1,
    "book_title": "The Silent River",
    "quantity": 40,
    "royalty_earned": 1800,
    "sale_date": "2025-01-12"
  }
]
```

**Error Responses:**
- `404 Not Found` - Author doesn't exist
- `400 Bad Request` - Invalid author ID format

### 4. POST /withdrawals
Creates a withdrawal request for an author.

**Request Body:**
```json
{
  "author_id": 1,
  "amount": 2000
}
```

**Success Response (201 Created):**
```json
{
  "id": 1,
  "author_id": 1,
  "amount": 2000,
  "status": "pending",
  "created_at": "2025-02-07",
  "new_balance": 1825
}
```

**Validation Rules:**
- Minimum withdrawal amount: ₹500
- Amount cannot exceed author's current balance
- Author must exist

**Error Responses:**
- `400 Bad Request` - Amount less than ₹500 or exceeds balance
- `404 Not Found` - Author doesn't exist

### 5. GET /authors/:id/withdrawals
Returns all withdrawal requests for an author, sorted by date (newest first).

**Response Example:**
```json
[
  {
    "id": 1,
    "author_id": 1,
    "amount": 2000,
    "status": "pending",
    "created_at": "2025-02-07"
  }
]
```

## Seed Data

The API initializes with the following data:

### Authors
1. **Priya Sharma** - priya@email.com (Expected balance: ₹3,825)
2. **Rahul Verma** - rahul@email.com (Expected balance: ₹9,975)
3. **Anita Desai** - anita@email.com (Expected balance: ₹400)

### Books
1. "The Silent River" by Priya Sharma - ₹45 per sale
2. "Midnight in Mumbai" by Priya Sharma - ₹60 per sale
3. "Code & Coffee" by Rahul Verma - ₹75 per sale
4. "Startup Diaries" by Rahul Verma - ₹50 per sale
5. "Poetry of Pain" by Rahul Verma - ₹30 per sale
6. "Garden of Words" by Anita Desai - ₹40 per sale

### Sales Transactions
- Book 1: 25 copies (2025-01-05), 40 copies (2025-01-12)
- Book 2: 15 copies (2025-01-08)
- Book 3: 60 copies (2025-01-03), 45 copies (2025-01-15)
- Book 4: 30 copies (2025-01-10)
- Book 5: 20 copies (2025-01-18)
- Book 6: 10 copies (2025-01-20)

## Business Logic

### Total Earnings
Calculated as the sum of all royalties from an author's book sales:
```
total_earnings = Σ(quantity × royalty_per_sale) for all sales
```

**Example for Priya Sharma:**
- Silent River: (25 + 40) × ₹45 = ₹2,925
- Midnight in Mumbai: 15 × ₹60 = ₹900
- **Total: ₹3,825**

### Current Balance
The amount available for withdrawal:
```
current_balance = total_earnings - total_withdrawals
```

Initially, since no withdrawals have been made, `current_balance = total_earnings`.

## Testing

You can test the API using curl, Postman, or any HTTP client:

```bash
# Get all authors
curl http://localhost:3000/authors

# Get author details
curl http://localhost:3000/authors/1

# Get author sales
curl http://localhost:3000/authors/1/sales

# Create a withdrawal
curl -X POST http://localhost:3000/withdrawals \
  -H "Content-Type: application/json" \
  -d '{"author_id": 1, "amount": 1000}'

# Get author withdrawals
curl http://localhost:3000/authors/1/withdrawals
```

## Project Structure

```
bookleaf-api/
├── src/
│   ├── config/
│   │   └── seedData.js       # Initial data (authors, books, sales)
│   ├── data/
│   │   └── store.js          # In-memory data store
│   ├── routes/
│   │   ├── authors.js        # Author endpoints
│   │   └── withdrawals.js    # Withdrawal endpoints
│   ├── services/
│   │   ├── authorService.js  # Author business logic
│   │   └── withdrawalService.js  # Withdrawal business logic
│   └── app.js                # Express app configuration
├── server.js                 # Server entry point
├── package.json              # Dependencies and scripts
└── README.md                 # Documentation
```

## Limitations

- **In-Memory Storage**: Data is stored in memory and will reset when the server restarts. This is intentional for this assignment to keep deployment simple.
- **No Authentication**: The API doesn't require authentication. In production, you'd want to secure withdrawal endpoints.
- **Single Instance**: The in-memory store isn't designed for multiple server instances.


## Time Spent

Approximately 2-3 hours for implementation, testing, and documentation.

## Author

Created as part of the BookLeaf Publishing technical assignment.
