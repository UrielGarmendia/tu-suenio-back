const { Order, User } = require("../db");

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

const createOrder = async (status, totalprice, UserId) => {
  const createOrder = await Order.create({ status, totalprice, UserId });
  const users = await User.findAll({
    where: { name: UserId },
  });
  users.forEach((c) => {
    c.addUsers(createOrder);
  });
  return createOrder;
};

module.exports = {
  getAllOrders,
  getOrderByStatus,
  createOrder,
};
