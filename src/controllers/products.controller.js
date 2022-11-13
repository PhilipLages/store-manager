const productsService = require('../services/products.service');
const httpStatus = require('../utils/httpStatus');

const getAllProducts = async (_req, res) => {
  const response = await productsService.getAllProducts();
  
  return res.status(httpStatus.OK).json(response);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getProductById(id);

  if (!response) return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });

  return res.status(httpStatus.OK).json(response);
};

const createNewProduct = async (req, res) => {
  const product = req.body;

  const result = await productsService.createNewProduct(product);

  return res.status(httpStatus.CREATED).json(result);
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
};