const connection = require('./db/connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );

  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );

  return result;
};

const createNewProduct = async ({ name }) => {
  await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
};
