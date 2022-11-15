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
  const result = await connection.execute(
  `${querys.SELECT} 
    ${querys.SALE_ID}  
    ${querys.SALE_DATE}
    ${querys.PRODUCTS} 
    ${querys.FROM} 
    ${querys.INNER_JOIN} 
    ${querys.ON}`,
  );
  return result;
};

const getSaleById = async (id) => {
  const result = await connection.execute(
  `${querys.SELECT} 
    ${querys.SALE_DATE}
    ${querys.PRODUCTS} 
    ${querys.FROM} 
    ${querys.INNER_JOIN} 
    ${querys.ON}
    ${querys.WHERE}`,
    [id],
  );

  return result;
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = (?)', [id],    
  );

  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = (?)', [id],
  );

  return affectedRows;
};

const updateSale = async (id, sales) => {
  const date = getDate();
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.sales SET date = (?) WHERE id = (?)', [date, id],    
  );

  await Promise.all(sales.map(async ({ productId, quantity }) => {
    await connection.execute(
      `UPDATE StoreManager.sales_products 
      SET quantity = (?) WHERE sale_id = (?) AND product_id = (?)`,
      [quantity, id, productId],
    );
  }));

  return affectedRows;
};

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
