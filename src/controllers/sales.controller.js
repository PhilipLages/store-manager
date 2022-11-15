const salesService = require('../services/sales.service');
const httpStatus = require('../utils/httpStatus');

const createNewSale = async (req, res) => {
  const sales = req.body;

  const result = await salesService.createNewSale(sales);

  if (result === null) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });  
  } 

  return res.status(httpStatus.CREATED).json(result);
};

const getAllSales = async (_req, res) => {
  const [result] = await salesService.getAllSales();

  return res.status(httpStatus.OK).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const [result] = await salesService.getSaleById(id);

  if (result === null) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Sale not found' });
  }

  return res.status(httpStatus.OK).json(result);
};

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
};