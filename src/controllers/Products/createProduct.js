const db = require("../../db.js");
const { uploadImgProduct } = require("../../utils/cloudinary.js");
const { Categorie } = require("../../db");

const createProduct = async (data, filePath) => {
  try {
    console.log("data que viene de la ruta: ", data);
    const product = { ...data };
    const { id_categorie } = product;
    console.log("path de la imagen: ", filePath);
    const result = await uploadImgProduct(filePath);
    const newProduct = await db.Product.create({
      ...product,
      image: filePath,
      image_public_id: result.public_id,
      image_secure_url: result.secure_url,
    });
    console.log("newProduct antes del save(): ", newProduct);
    await newProduct.save();
    console.log("newProduct despues del save(): ", newProduct);

    const categories = await Categorie.findByPk(id_categorie);
    if (!categories) {
      throw new Error("Error al obtener las categorías");
    }
    await newProduct.addCategories(categories);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = createProduct;
