const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔑 Ambil data dari environment variable
const partner_id = process.env['Test Partner_id'];
const partner_key = process.env['Test API Partner Key'];
const shop_id = process.env['Shop ID'];
const redirect_url = process.env['REDIRECT_URL'];

const crypto = require('crypto');
const axios = require('axios');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('AutoBoost Shopee is running!');
});

// 🔐 Route untuk memulai login via Shopee OAuth
app.get('/login', (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const baseString = `${partner_id}${redirect_url}${timestamp}`;
  const hmac = crypto.createHmac('sha256', partner_key);
  const sign = hmac.update(baseString).digest('hex');

  const url = `https://partner.test-stable.shopeemobile.com/api/v2/shop/auth_partner?partner_id=${partner_id}&redirect=${redirect_url}&timestamp=${timestamp}&sign=${sign}`;
  res.redirect(url);
});

// 🔁 Callback dari Shopee OAuth
app.get('/callback', (req, res) => {
  console.log('Shopee callback query:', req.query);  // tampilkan query param
  res.send('Authorization callback received!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
