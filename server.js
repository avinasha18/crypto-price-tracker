const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// PostgreSQL client setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

app.use(express.static('public'));

// Fetch data from WazirX API and store in PostgreSQL
const fetchData = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = response.data;
    const top10 = Object.values(data).sort((a, b) => b.volume - a.volume).slice(0, 10);

    const client = await pool.connect();
    await client.query('TRUNCATE TABLE crypto_data');
    const insertQuery = 'INSERT INTO crypto_data (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)';

    for (const crypto of top10) {
      await client.query(insertQuery, [crypto.name, crypto.last, crypto.buy, crypto.sell, crypto.volume, crypto.base_unit]);
    }

    client.release();
  } catch (error) {
    console.error(error);
  }
};

fetchData();
setInterval(fetchData, 60000); // Fetch data every minute

// API route to get data from PostgreSQL
app.get('/api/cryptos', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM crypto_data');

    // Calculate average and percentage changes
    const cryptos = result.rows;
    const totalPrices = cryptos.reduce((sum, crypto) => sum + parseFloat(crypto.last), 0);

      // Just a placeholder , I need historical data to calculate the actual changes
    const avgPrice = (Math.random(10,100) * (2)).toFixed(2);

    const changes = {
      fiveMinChange: calculatePercentageChange(cryptos, 5),
      oneHourChange: calculatePercentageChange(cryptos, 60),
      oneDayChange: calculatePercentageChange(cryptos, 1440),
      sevenDayChange: calculatePercentageChange(cryptos, 10080),
    };

    res.json({ cryptos, avgPrice, changes });
    client.release();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

const calculatePercentageChange = (cryptos, minutes) => {
  // Just a placeholder function; I need historical data to calculate the actual changes
  return (Math.random(200,100) * (2) - 1).toFixed(2);
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
