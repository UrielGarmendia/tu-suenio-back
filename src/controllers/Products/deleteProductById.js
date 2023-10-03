const db = require("../../db");

const toggleProductAvailability = async (productId, isAvailable = false) => {
  const product = await db.Product.findByPk(productId);

  if (!product) throw new Error("Product not found");

  if (product.isAvailable === isAvailable) {
    const action = isAvailable ? "activated" : "deactivated";
    throw new Error(`Product is already ${action}`);
  }

  product.isAvailable = isAvailable;
  await product.save();
};

module.exports = toggleProductAvailability;