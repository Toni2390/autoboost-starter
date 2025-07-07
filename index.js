const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home
app.get('/', (req, res) => {
  res.send('AutoBoost Shopee is running!');
});

// 🔥 Login endpoint
app.get('/login', (req, res) => {
  try {
    const partner_id = process.env.TEST_PARTNER_ID;
    const redirect_url = process.env.REDIRECT_URL;
    const timestamp = Math.floor(Date.now() / 1000);
    const partner_key = process.env.TEST_API_PARTNER_KEY;

    const baseUrl = 'https://partner.test-stable.shopeemobile.com/api/v2/shop/auth_partner';

    const crypto = require('crypto');
    const stringToSign = `${partner_id}${redirect_url}${timestamp}`;
    const sign = crypto
      .createHmac('sha256', partner_key)
      .update(stringToSign)
      .digest('hex');

    const fullUrl = `${baseUrl}?partner_id=${partner_id}&timestamp=${timestamp}&sign=${sign}&redirect=${redirect_url}`;

    return res.redirect(fullUrl);
  } catch (error) {
    console.error('Error in /login:', error);
    return res.status(500).send('Internal Server Error on /login');
  }
});

// Callback dari Shopee
app.get('/callback', (req, res) => {
  console.log('Shopee callback query:', req.query);
  res.send('Authorization callback received!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
