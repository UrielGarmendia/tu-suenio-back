const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, PUBLIC_KEY } = process.env;

if (ACCESS_TOKEN) {
  mercadopago.configure({
    access_token: ACCESS_TOKEN,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  });
}

router.get("/success", async (req, res) => {
  res.send("funca loco SUCCESS");
});

router.get("/failure", async (req, res) => {
  res.send("funca loco FAILURE");
});

router.post("/create_preference", async (req, res) => {
  const productos = req.body;
  //TODO: Cambiar a productos ya que recibe mas de 1 productos(borrar el array)

  const preference = {
    items: productos,
    currency_id: "COL",
    back_urls: {
      success: "https://tu-suenio-back.onrender.com/payment/success",
      failure: "https://tu-suenio-back.onrender.com/payment/failure",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
