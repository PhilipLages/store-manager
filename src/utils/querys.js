const SELECT = 'SELECT';
const SALE_ID = 'sales.id AS saleId,';
const SALE_DATE = 'sales.date,';
const PRODUCTS = 'products.product_id AS productId, products.quantity';
const FROM = 'FROM StoreManager.sales AS sales';
const INNER_JOIN = 'INNER JOIN StoreManager.sales_products AS products';
const ON = 'ON sales.id = products.sale_id';
const WHERE = 'WHERE sales.id = ?';

module.exports = {
  SELECT,
  SALE_DATE,
  SALE_ID,
  PRODUCTS,
  FROM,
  INNER_JOIN,
  ON,
  WHERE,
};
