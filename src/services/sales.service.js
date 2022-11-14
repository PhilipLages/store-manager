const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const createNewSales = async (sales) => {
  
  const result = await salesModel.createNewSales(sales);

  return { id: result, itemsSold: [...sales] };
};

module.exports = {
  createNewSales,
};