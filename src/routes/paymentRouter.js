const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN, BACK_URL, FRONT_URL } = process.env;

if (ACCESS_TOKEN) {
  mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });
}

router.get("/success", async (req, res) => {
  res.send("funca loco");
});

router.post("/create_preference", async (req, res) => {
  const productos = req.body;
  //TODO: Cambiar a productos ya que recibe mas de 1 productos(borrar el array)

  const preference = {
    items: productos,
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
