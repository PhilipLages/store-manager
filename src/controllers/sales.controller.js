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

  if (result && !result.length) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Sale not found' });
  }

  return res.status(httpStatus.OK).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.deleteSale(id);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Sale not found' });
  }

  return res.status(httpStatus.DELETED).json();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const result = await salesService.updateSale(id, sales);

  if (result.message) {
    return res.status(httpStatus.NOT_FOUND).json({ message: result.message });
  } 

  return res.status(httpStatus.OK).json(result);
};

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};