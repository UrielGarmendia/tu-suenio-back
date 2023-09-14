const { Router } = require("express");
const {
  getAllOrders,
  getOrderByStatus,
  createOrder,
  deleteOrder,
  putOrder,
} = require("../controllers/Order/OrderController");

const router = Router();

router.get("/", async (req, res) => {
  const { status } = req.query;
  try {
    const orders = status
      ? await getOrderByStatus(status)
      : await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orderId = await getAllOrders();
    const searchId = orderId.filter((c) => c.id == id);
    res.status(200).json(searchId);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { status, totalprice, UserId, ProductId } = req.body;
  try {
    const createDb = await createOrder(status, totalprice, UserId, ProductId);
    res.status(200).json(createDb);
  } catch (error) {
    res.status(400).send("error:" + error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteOrder(id);
    res.status(200).json({ message: "Order borrado con exito" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error al borrar la Order" });
  }
});

router.put("/:id", async (req, res) => {
  const orderId = req.params.id;
  const updateOrder = req.body;
  try {
    const order = await putOrder(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.update(updateOrder);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error update Order" });
  }
});

module.exports = router;
