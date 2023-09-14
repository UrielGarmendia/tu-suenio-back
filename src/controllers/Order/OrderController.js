const { Order, Product } = require("../../db");

const getAllOrders = async () => {
  const orders = await Order.findAll();
  return orders;
};

const getOrderByStatus = async (status) => {
  if (status !== "") {
    const searchStatus = await Order.findAll({
      where: { status: status },
    });
    return searchStatus;
  } else {
    return "No puede ser vacio";
  }
};

const createOrder = async (status, totalprice, UserId, ProductId) => {
  const createOrder = await Order.create({
    status,
    totalprice,
    UserId,
  });

  const products = await Product.findByPk(ProductId);
  if (!products) {
    throw new Error("Product not found");
  }
  await createOrder.addProducts(products);
  return createOrder;
};

const deleteOrder = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error("Order not found");
  await order.destroy();
};

const putOrder = async (id, updateOrder) => {
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }
    await order.update(updateOrder);
    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllOrders,
  getOrderByStatus,
  createOrder,
  deleteOrder,
  putOrder,
};
