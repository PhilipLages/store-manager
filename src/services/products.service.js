const productsModel = require('../models/products.model');

const STATUS_NOT_FOUND = 404;
const STATUS_OK = 200;

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();

  return { type: STATUS_OK, products };
};

const getProductById = async (id) => {
  const [productById] = await productsModel.getProductById(id);

  if (!productById) return { type: STATUS_NOT_FOUND, message: 'Product not found' };

  return { type: STATUS_OK, productById };
};

module.exports = {
  getAllProducts,
  getProductById,
};
