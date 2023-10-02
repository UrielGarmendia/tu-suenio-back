const { Router } = require("express");
const Stripe = require("stripe");
const { CLAVE_PRIV } = process.env;
const router = Router();

const stripe = new Stripe(CLAVE_PRIV);

router.post("/newPayment", async (req, res) => {
  try {
    const info = req.body;

    const payment = await stripe.paymentIntents.create({
      amount: info.amount,
      payment_method: info.id,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      confirm: true,
      return_url: "http://localhost:3001/payment/success",
      use_stripe_sdk: true,
    });

    res.status(200).send({ message: payment.status, payment });
  } catch (error) {
    console.error(error);
    res.send({ message: error.raw.message, error: error });
  }
});
// const mercadopago = require("mercadopago");
// const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, PUBLIC_KEY } = process.env;

// mercadopago.configure({
//   access_token: ACCESS_TOKEN,
//   // client_id: CLIENT_ID,
//   // client_secret: CLIENT_SECRET,
// });

// router.get("/success", async (req, res) => {
//   res.send("VA LOCO VAAA!!!");
// });

// router.get("/failure", async (req, res) => {
//   res.send("funca loco FAILURE");
// });

// router.post("/create_preference", async (req, res) => {
//   const productos = req.body;

//   const preference = {
//     items: productos,
//     currency_id: "COL",
//     back_urls: {
//       success: "http://localhost:3001/payment/success",
//       failure: "http://localhost:3001/payment/failure",
//       pending: "",
//     },
//     auto_return: "approved",
//   };

//   mercadopago.preferences
//     .create(preference)
//     .then(function (response) {
//       console.log(response);
//       res.json(response.body);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

module.exports = router;
