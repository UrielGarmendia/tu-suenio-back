const { Router } = require("express");
const CategorieRouter = require("./CategorieRouter");
const router = Router();
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

router.use("/products", productRouter);
router.use("/user", userRouter);
router.use("/categorie", CategorieRouter);

module.exports = router;
