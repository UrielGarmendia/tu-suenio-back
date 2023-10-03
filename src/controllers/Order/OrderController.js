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

const createOrder = async (status, totalprice, UserId, products) => {
  const createOrder = await Order.create({
    status,
    totalprice,
    UserId,
    products,
  });

  //
  if (!createOrder) {
    throw new Error("Hubo un error a la hora de crear un producto");
  }
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
