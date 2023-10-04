const { Router } = require("express");
const Stripe = require("stripe");
const { Order, User } = require("../db");
const { sendPurchaseEmail } = require("../utils/nodemailer");
const { CLAVE_PRIV } = process.env;
const router = Router();

const stripe = new Stripe(CLAVE_PRIV);

router.post("/newPayment", async (req, res) => {
  try {
    const info = req.body;
    console.log("info que llega a la ruta de payment: ", info);
    const payment = await stripe.paymentIntents.create({
      amount: info.amount,
      payment_method: info.id,
      currency: "usd",
      // automatic_payment_methods: { enabled: true },
      confirm: true,
      return_url: "http://localhost:3001/payment/success",
      // use_stripe_sdk: true,
    });

    res.status(200).send({ message: payment.status, payment });
  } catch (error) {
    console.error(error);
    res.send({ message: error.raw.message, error: error });
  }
});

router.post("/order-notification", async (req, res) => {
  const data = req.body.dataOrder;
  console.log("info de data: ", data);
  console.log("id de order", data.id);
  const order = await Order.findOne({ where: { id: data.id } });
  console.log("info de la orden: ", order);
  const user = await User.findByPk(order.UserId);
  console.log("info que llega a user: ", user);
  await sendPurchaseEmail(user, order);
});

module.exports = router;
