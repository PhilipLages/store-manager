const connection = require('./db/connection');
const getDate = require('../utils/date');

const createNewSale = async (sales) => {
  const date = getDate();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)', [date],    
  );

  await Promise.all(sales.map(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, productId, quantity],
    );
  }));

  return insertId;
};

module.exports = {
  createNewSale,
};
