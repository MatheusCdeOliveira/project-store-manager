const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [products] = await connection.execute(query);
  return products;
};

const findById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);
  return product;
};

const update = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
   await connection.execute(query, [name, id]);
  return { id, name }; 
};

const remove = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
   await connection.execute(query, [id]);
};

const insert = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};
 
module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove,
};