const { Router } = require("express");
const CategorieRouter = require("./CategorieRouter");
const OrderRouter = require("./OrderRouter");
const router = Router();

router.use("/categorie", CategorieRouter);
router.use("/order", OrderRouter);

module.exports = router;
