const db = require("../../db.js");
const { uploadImgProduct } = require("../../utils/cloudinary.js");

const createProduct = async (data, filePath) => {
  try {
    const product = { ...data };
    const newProduct = await db.Product.create(product);
    const result = await uploadImgProduct(filePath);
    newProduct.image_public_id = result.public_id;
    newProduct.image_secure_url = result.secure_url;
    console.log("newProduct antes del save(): ", newProduct);
    await newProduct.save();
    console.log("newProduct despues del save(): ", newProduct);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = createProduct;
