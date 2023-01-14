const Joi = require('joi');
const { productsModel } = require('../models');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
}).required();

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
  const { error } = productSchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { id, name };
}; 

module.exports = {
  getAll,
  findById,
  insert,
};