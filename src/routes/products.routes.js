const express = require('express');
const productsController = require('../controllers/products.controller');
const { validateProduct } = require('../middlewares/products.middlewares');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.post('/', validateProduct, productsController.createNewProduct);
productsRouter.put('/:id', validateProduct, productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;