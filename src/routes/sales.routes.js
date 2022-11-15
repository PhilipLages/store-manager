const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validateId, validateQuantity } = require('../middlewares/sales.middlewares');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.post('/', validateId, validateQuantity, salesController.createNewSale);

module.exports = salesRouter;
