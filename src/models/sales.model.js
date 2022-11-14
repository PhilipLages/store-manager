const connection = require('./db/connection');

const createNewSales = async ({ id, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (product_id, quantity) VALUES (?, ?)',
    [id, quantity],
  );

  return insertId;
};

module.exports = {
  createNewSales,
};
