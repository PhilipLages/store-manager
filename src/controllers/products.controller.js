const productsService = require('../services/products.service');

const getAllProducts = async (_req, res) => {
  const { type, products } = await productsService.getAllProducts();

  if (!type) return res.status(type).json({ message: 'OK' });
  
  return res.status(type).send(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, productById, message } = await productsService.getProductById(id);

  if (type !== 200) return res.status(type).json({ message });

  return res.status(type).send(productById);
};

module.exports = {
  getAllProducts,
  getProductById,
};