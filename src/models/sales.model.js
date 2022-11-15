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

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
        sales.id AS saleId,
        sales.${`date`},
        products.product_id AS productId,
        products.quantity
      FROM StoreManager.sales AS sales
      INNER JOIN StoreManager.sales_products AS products
	      ON sales.id = products.sale_id`
  );

  return result;
};

getAllSales();

module.exports = {
  createNewSale,
  getAllSales,
};
