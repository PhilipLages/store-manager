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

module.exports = {
  createNewSale,
};
