const { Router } = require("express");
const router = Router();
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

router.use("/products", productRouter);
router.use("/user", userRouter);

module.exports = router;
