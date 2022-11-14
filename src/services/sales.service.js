const salesModel = require('../models/sales.model');

const createNewSales = async (sales) => {
  const result = await Promise.all(sales.map(async (sale) => {
    salesModel.createNewSales(sale);
  }));

  return { id: result, itemsSold: [...sales] };
};

module.exports = {
  createNewSales,
};