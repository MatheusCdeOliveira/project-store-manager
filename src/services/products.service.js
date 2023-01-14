const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return product;
};

const insert = async ({ name }) => {
  const id = await productsModel.insert({ name });
  return { id, name };
}; 

module.exports = {
  getAll,
  findById,
  insert,
};