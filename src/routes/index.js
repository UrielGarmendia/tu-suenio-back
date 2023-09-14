const { Router } = require("express");
const CategorieRouter = require("./CategorieRouter");
const router = Router();
const productRouter = require("./productRouter");


router.use("/products", productRouter);
router.use("/categorie", CategorieRouter);

module.exports = router;