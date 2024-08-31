const Express = require('express');
const Razorpay = require('razorpay');
const app = Express();
const cors = require('cors')

app.use(cors())
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

var razorpay = new Razorpay({
  key_id: 'rzp_test_u2zpkcOfjVym1W',
  key_secret: 'SnahDDNQji0FC7SQiCHHOmtx',
});

app.post('/order', async (req, res) => {
  try {
    const data = await razorpay.orders.create({
      amount: 500 * 100, //in paise
      currency: 'INR',
      receipt: 'RCP_ID' + Date.now(),
    });
    return res.status(200).json({
      'amount': data.amount,
      'id':data.id
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
});
