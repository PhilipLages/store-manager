const connection = require('./db/connection');

const getAllProducts = async () => {
  const result = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );

  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = (?)', [id],
  );

  return result;
};

const createNewProduct = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );

  return insertId;
};

const updateProduct = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
    [name, id],
  );

  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?)', [id],
  );

  return affectedRows;
};

const searchProducts = async (term) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE '%${term}%' `,
  );

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
