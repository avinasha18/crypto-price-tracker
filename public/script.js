document.addEventListener('DOMContentLoaded', () => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/cryptos');
      const data = await response.json();
      
      const { cryptos, avgPrice, changes } = data;

      updateTable(cryptos);
      updateAveragePrice(avgPrice);
      updateStatistics(changes);

      startTimer();
      if (fetchInterval) clearInterval(fetchInterval);
      fetchInterval = setInterval(fetchData, 60000); // Fetch data every minute
    } catch (error) {
      console.error(error);
    }
  };

  const updateTable = (cryptos) => {
    const tableBody = document.querySelector('#crypto-table tbody');
    tableBody.innerHTML = '';

    cryptos.forEach((crypto, index) => {
      const diff = (crypto.sell - crypto.buy).toFixed(2);
      const savings = ((crypto.buy - crypto.sell) * crypto.volume).toFixed(2);
      const diffPercentage = ((crypto.sell - crypto.buy) / crypto.buy * 100).toFixed(2);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${crypto.name}</td>
        <td>₹ ${crypto.last}</td>
        <td>₹ ${crypto.buy} / ₹ ${crypto.sell}</td>
        <td>${diffPercentage} %</td>
        <td>₹ ${savings}</td>
      `;
      tableBody.appendChild(row);
    });
  };

  const updateAveragePrice = (avgPrice) => {
    const avgPriceElement = document.getElementById('average-price');
    avgPriceElement.textContent = `₹ ${avgPrice}`;
  };

  const updateStatistics = (changes) => {
    document.getElementById('five-min-change').textContent = `${changes.fiveMinChange} %`;
    document.getElementById('one-hour-change').textContent = `${changes.oneHourChange} %`;
    document.getElementById('one-day-change').textContent = `${changes.oneDayChange} %`;
    document.getElementById('seven-day-change').textContent = `${changes.sevenDayChange} %`;
  };

  const startTimer = () => {
    const timerElement = document.getElementById('timer');
    let timeLeft = 60;

    const updateTimer = () => {
      if (timeLeft === 0) {
        fetchData();
      } else {
        timeLeft--;
        timerElement.textContent = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
        setTimeout(updateTimer, 1000);
      }
    };

    updateTimer();
  };

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Fetch initial data
  let fetchInterval;
  fetchData();
});
