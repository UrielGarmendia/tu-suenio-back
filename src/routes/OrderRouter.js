const { Router } = require("express");
const {
  getAllOrders,
  getOrderByStatus,
  createOrder,
} = require("../controllers/OrderController");

const router = Router();

router.get("/", async (req, res) => {
  const { status } = req.query;
  try {
    const orders = status ? await getOrderByStatus(status) : getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send("error:" + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orderId = await getAllOrders();
    const searchId = orderId.filter((c) => c.id == id);
    res.status(200).json(searchId);
  } catch (error) {
    res.status(400).send("error:" + error.message);
  }
});

router.post("/", async (req, res) => {
  const { status, totalprice, UserId } = req.body;
  try {
    const createDb = await createOrder(status, totalprice, UserId);
    res.status(200).json(createDb);
  } catch (error) {
    res.status(400).send("error:" + error.message);
  }
});

module.exports = router;
