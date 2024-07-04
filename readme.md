# Crypto Price Tracker

Welcome to the Crypto Price Tracker! This project fetches the top 10 cryptocurrencies by volume from the WazirX API and stores the data in a PostgreSQL database. Then, it serves this data via a REST API and calculates average prices and percentage changes over various time periods.

## Getting Started

### What You Need

- Node.js 
- PostgreSQL 

### How to Set It Up

 **Clone the repo:**
   ```bash
   git clone https://github.com/avinasha18/crypto-price-tracker.git
   cd crypto-price-tracker
   ```
# Install the packages:
    ```bash
    npm install
    Set up PostgreSQL:
    ```

Create a database named postgres (or any name you like).
Update the database connection settings in server.js if needed.
Create the table in your database:

# sql
```sql
CREATE TABLE crypto_prices (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  open DECIMAL,
  high DECIMAL,
  low DECIMAL,
  close DECIMAL,
  volume DECIMAL
);
```

# Running the App
    Start the server:
        node server.js
        Open your browser and go to http://localhost:3000.

# API Endpoints
GET /: Shows the top 10 cryptocurrencies by volume.
GET /average-prices: Shows the average prices for the top 10 cryptocurrencies over various time periods.
GET /percentage-change: Shows the percentage change for the top 10 cryptocurrencies over various time periods.
# Project Layout

crypto-price-tracker/
├── node_modules/
├── public/
│   └── index.html
|   └── styles.css
|   └── script.js
├── server.js
├── package.json
└── README.md
### Tech Used
    Node.js
    Express.js
    PostgreSQL
    WazirX API

Enjoy tracking those crypto prices!