const { Router } = require("express");
const CategorieRouter = require("./CategorieRouter");
const router = Router();

router.use("/categorie", CategorieRouter);

module.exports = router;
