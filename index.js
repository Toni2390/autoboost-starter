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

  const redirect = `https://partner.shopeemobile.com${path}?partner_id=${partner_id}&timestamp=${timestamp}&sign=${sign}&redirect=${encodeURIComponent(redirect_url)}`;
  
  res.redirect(redirect);
});

app.get('/', (req, res) => {
  res.send('AutoBoost Shopee is running!');
});

app.get('/callback', (req, res) => {
  console.log('Shopee callback query:', req.query);
  res.send('Authorization callback received!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
