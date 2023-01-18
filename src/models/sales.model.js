const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT
  sale_id, date, product_id, quantity FROM StoreManager.sales AS s INNER JOIN
  StoreManager.sales_products AS sp ON s.id = sp.sale_id INNER JOIN
  StoreManager.products AS p ON p.id = sp.product_id`;
  const sales = await connection.execute(query);
  return camelize(sales);
};

const findById = async (saleId) => {
  const query = `SELECT date, product_id, quantity FROM StoreManager.sales AS s 
  INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id WHERE sale_id = ?
  ORDER BY sale_id ASC, product_id ASC`;
  const [sale] = await connection
    .execute(query, [saleId]);
  return camelize(sale);
};

const insertSale = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (?)', [new Date()]);
  return insertId;
};

const insertSaleProduct = async (productId, quantity, saleId) => {
     await connection
      .execute(`INSERT INTO StoreManager.sales_products
       (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
        [saleId, productId, quantity]);
    return { productId, quantity };
};

module.exports = {
  getAll,
  findById,
  insertSaleProduct,
  insertSale,
};