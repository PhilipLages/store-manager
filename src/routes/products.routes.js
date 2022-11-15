const express = require('express');
const productsController = require('../controllers/products.controller');
const { validateProduct } = require('../middlewares/products.middlewares');

const productsRouter = express.Router();

productsRouter.get('/search', productsController.searchProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.put('/:id', validateProduct, productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);
productsRouter.get('/', productsController.getAllProducts);
productsRouter.post('/', validateProduct, productsController.createNewProduct);

module.exports = productsRouter;