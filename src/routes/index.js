const { Router } = require("express");
const router = Router();
const productRouter = require("./productRouter");

router.use("/products", productRouter);

module.exports = router;