const db = require("../../db");
const { deleteImg } = require("../../utils/cloudinary");

module.exports = async (id) => {
  try {
    const productToDestroy = await db.Product.findByPk(id);
    console.log(productToDestroy);

    if (!productToDestroy) {
      throw new Error("Producto no encontrado");
    }

    await deleteImg(productToDestroy.image_public_id);
    await productToDestroy.destroy();
    return productToDestroy;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Error al eliminar el producto de la DB");
  }
};
