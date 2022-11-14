const express = require('express');
const salesController = require('../controllers/sales.controller');

const salesRouter = express.Router();

salesRouter.post('/', salesController.createNewSales);

module.exports = salesRouter;
