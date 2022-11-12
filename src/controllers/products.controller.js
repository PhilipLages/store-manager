const productsService = require('../services/products.service');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;

const getAllProducts = async (_req, res) => {
  const response = await productsService.getAllProducts();
  
  return res.status(STATUS_OK).send(response);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getProductById(id);

  if (!response) return res.status(STATUS_NOT_FOUND).json({ message: 'Product not found' });

  return res.status(STATUS_OK).send(response);
};

module.exports = {
  getAllProducts,
  getProductById,
};