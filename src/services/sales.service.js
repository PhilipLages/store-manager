const salesModel = require('../models/sales.model');
const checkProductId = require('../utils/checkProductId');

const createNewSale = async (sales) => {   
  const nonexistent = checkProductId(sales);

  if (nonexistent.length > 0) {
    return null;
  } 

  const result = await salesModel.createNewSale(sales);
  
  return { id: result, itemsSold: [...sales] };
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  
  return result;
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);

  if (!result.length) return null;

  return result;
};

const deleteSale = async (id) => {
  const [result] = await salesModel.getSaleById(id);

  if (!result.length) return null;
  
  await salesModel.deleteSale(id);

  return { status: 204 };
};

const updateSale = async (id, sales) => {
  const [result] = await salesModel.getSaleById(id);

  if (result && !result.length) return { message: 'Sale not found' };  

  const nonexistent = await checkProductId(sales);

  if (nonexistent.length > 0) {
    return { message: 'Product not found' };
  } 

  await salesModel.updateSale(id, sales);

  return { saleId: Number(id), itemsUpdated: sales };
};

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
