const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const createNewSale = async (sales) => { 
  const nonexistent = [];
  await Promise.all(
    sales.map(async ({ productId }) => {
      const [product] = await productsModel.getProductById(productId);
    
      if (!product) nonexistent.push(product);

      return [];
    }),
  );

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

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
};
