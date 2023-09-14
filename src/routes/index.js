const { Router } = require("express");
const CategorieRouter = require("./CategorieRouter");
const OrderRouter = require("./OrderRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const router = Router();

router.use("/products", productRouter);
router.use("/user", userRouter);
router.use("/categorie", CategorieRouter);
router.use("/order", OrderRouter);

module.exports = router;
