const productsModel = require('../models/products.model');

const checkProductId = async (sales) => {
  const nonexistent = [];
  await Promise.all(
    sales.map(async ({ productId }) => {
      const [product] = await productsModel.getProductById(productId);
    
      if (!product) nonexistent.push(product);

      return [];
    }),
  );

  return nonexistent;
};

module.exports = checkProductId;