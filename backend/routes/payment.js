const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: "rzp_test_1234567890abcdef", // Yahan bhi wahi test key
  key_secret: "YOUR_RAZORPAY_SECRET" // Yahan apni secret key daalo
});

router.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // amount in paise
      currency: "INR",
      receipt: "receipt_order_1"
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;