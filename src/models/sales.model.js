const connection = require('./db/connection');
const getDate = require('../utils/date');
const querys = require('../utils/querys');

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
    `${querys.SELECT} ${querys.FROM} ${querys.INNER_JOIN} ${querys.ON}`,
  );
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `${querys.SELECT} ${querys.FROM} ${querys.INNER_JOIN} ${querys.ON} ${querys.WHERE}`,
    [id],
  );

  return result;
};

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
};
