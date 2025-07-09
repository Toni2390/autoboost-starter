require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/login', (req, res) => {
  const partner_id = process.env.PARTNER_ID;
  const partner_key = process.env.PARTNER_KEY;
  const redirect_url = process.env.REDIRECT_URL;

  const timestamp = Math.floor(Date.now() / 1000);
  const path = '/api/v2/shop/auth_partner';
  const baseString = `${partner_id}${path}${timestamp}`;
  const sign = crypto.createHmac('sha256', partner_key).update(baseString).digest('hex');

  const authUrl = `https://partner.test-stable.shopeemobile.com${path}?partner_id=${partner_id}&timestamp=${timestamp}&sign=${sign}&redirect=${encodeURIComponent(redirect_url)}`;
  
  res.redirect(authUrl);
});

// ✅ Cukup satu kali route /callback
app.get('/callback', (req, res) => {
  const { code, shop_id } = req.query;
  if (!code || !shop_id) {
    return res.status(400).send('Missing code or shop_id from Shopee.');
  }
  console.log('Shopee callback:', req.query);
  res.send('Authorization callback received!');
});

app.get('/', (req, res) => {
  res.send('Shopee API App is running!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
