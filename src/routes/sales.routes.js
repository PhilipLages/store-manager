const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validateId, validateQuantity } = require('../middlewares/sales.middlewares');

const salesRouter = express.Router();

salesRouter.get('/:id', salesController.getSaleById);
salesRouter.put('/:id', validateId, validateQuantity, salesController.updateSale);
salesRouter.delete('/:id', salesController.deleteSale);
salesRouter.get('/', salesController.getAllSales);
salesRouter.post('/', validateId, validateQuantity, salesController.createNewSale);

module.exports = salesRouter;
