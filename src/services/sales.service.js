const { salesModel } = require('../models');
const { productsModel } = require('../models');

const getAll = async () => {
  const [sales] = await salesModel.getAll();
  return sales;
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (!sale || sale.length === 0) return { type: 'SALE_NOT_FOUND' };
  return sale;
};

const insert = async (newSale) => {
  const result1 = await Promise
  .all(newSale.map((i) => productsModel.findById(i.productId)));
  if (result1
    .some((product) => product === undefined)) return { type: 'PRODUCT_NOT_FOUND' };
  const saleId = await salesModel.insertSale();
  const result = await Promise
    .all(newSale.map((i) => salesModel.insertSaleProduct(i.productId, i.quantity, saleId)));
  console.log(result);
  return { id: saleId, itemsSold: result };
};

module.exports = { getAll, insert, findById };