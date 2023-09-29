const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, PUBLIC_KEY } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
  // client_id: CLIENT_ID,
  // client_secret: CLIENT_SECRET,
});

router.get("/success", async (req, res) => {
  const { payment_id, status, payment_type } = req.params;
  res.send(payment_id, status, payment_type);
});

router.get("/failure", async (req, res) => {
  res.send("funca loco FAILURE");
});


router.post("/create_preference", async (req, res) => {
  const productos = req.body;

  const preference = {
    items: productos,
    currency_id: "COL",
    back_urls: {
      success: "https://tu-suenio-back.onrender.com/alcancias",
      failure: "https://tu-suenio-back.onrender.com/alcancias",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {

      console.log(response);

      res.json(response.body);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;