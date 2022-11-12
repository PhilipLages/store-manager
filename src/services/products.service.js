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
getProductById(5);

module.exports = {
  getAllProducts,
  getProductById,
};
