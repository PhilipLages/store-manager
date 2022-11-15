const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const [response] = await productsModel.getAllProducts();

  return response;
};

const getProductById = async (id) => {
  const response = await productsModel.getProductById(id);

  if (response && !response.length) return null;
  
  return response;
};

const createNewProduct = async (product) => {
  const result = await productsModel.createNewProduct(product);

  return { id: result, ...product };
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
};
