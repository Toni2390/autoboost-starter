const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('AutoBoost Shopee is running!');
});

// 🔥 Route callback Shopee akan arahkan ke sini
app.get('/callback', (req, res) => {
  console.log('Shopee callback query:', req.query);  // untuk lihat di log
  res.send('Authorization callback received!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
