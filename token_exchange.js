require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');

// Ambil variabel dari environment
const partner_id = process.env.PARTNER_ID;
const partner_key = process.env.PARTNER_KEY;
const shop_id = process.env.TEST_SHOP_ID; // tambahkan ini di .env nanti
const code = process.env.AUTH_CODE;       // tambahkan juga ini di .env nanti

const timestamp = Math.floor(Date.now() / 1000);
const path = '/api/v2/auth/token/get';

// Buat signature
const baseString = `${partner_id}${path}${timestamp}`;
const sign = crypto.createHmac('sha256', partner_key).update(baseString).digest('hex');

// Kirim request ke Shopee API
axios.post('https://partner.test-stable.shopeemobile.com/api/v2/auth/token/get', {
  code,
  shop_id: Number(shop_id),
  partner_id: Number(partner_id),
  sign,
  timestamp
}, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('✅ Success - Access Token Response:');
  console.log(response.data);
})
.catch(error => {
  console.error('❌ Failed:', error.response?.data || error.message);
});
