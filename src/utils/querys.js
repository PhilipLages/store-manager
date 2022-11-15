const SELECT = 'SELECT sales.id AS saleId, sales.date, products.product_id, products.quantity';
const FROM = 'FROM StoreManager.sales AS sales';
const INNER_JOIN = 'INNER JOIN StoreManager.sales_products AS products';
const ON = 'ON sales.id = products.sale_id';
const WHERE = 'WHERE sales.id = ?';

module.exports = {
  SELECT,
  FROM,
  INNER_JOIN,
  ON,
  WHERE,
};
