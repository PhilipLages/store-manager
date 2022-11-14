const salesService = require('../services/sales.service');
const httpStatus = require('../utils/httpStatus');

const createNewSales = async (req, res) => {
  const sales = req.body;

  const result = await salesService.createNewSales(sales);

  return res.status(httpStatus.CREATED).json(result);
};

module.exports = {
  createNewSales,
};