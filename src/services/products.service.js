const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const response = await productsModel.getAllProducts();

  return response;
};

const getProductById = async (id) => {
  const [response] = await productsModel.getProductById(id);

  if (!response) return null;
  
  return response;
};

const createNewProduct = async (product) => {
  await productsModel.createNewProduct(product);

  const products = await getAllProducts();

  return products[products.length - 1];
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
};
