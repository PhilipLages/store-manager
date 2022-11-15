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

const updateProduct = async (id, name) => {
  const result = await productsModel.getProductById(id);

  if (result && !result.length) return null;

  await productsModel.updateProduct(id, name);

  return { id: Number(id), name };
};

const deleteProduct = async (id) => {
  const result = await productsModel.getProductById(id);

  if (result && !result.length) return null;
  
  await productsModel.deleteProduct(id);

  return { status: 204 };
};

const searchProducts = async (term) => {
  const result = await productsModel.searchProducts(term);

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
