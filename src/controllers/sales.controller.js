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

module.exports = {
  createNewSale,
};