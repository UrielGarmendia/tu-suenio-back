const { Router } = require("express");
const CategorieRouter = require("./CategorieRouter");
const router = Router();
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const sortProductsRouter = require("./sortProductsRouter");
const filtersProductsRouter = require("./filtersProductsRouter")

router.use("/products", productRouter);
router.use("/user", userRouter);
router.use("/categorie", CategorieRouter);
router.use("/sort", sortProductsRouter);
router.use("/filter", filtersProductsRouter);

module.exports = router;
