const Joi = require('joi');
const { productsModel } = require('../models');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
}).required();

const validateName = Joi.object({
  name: Joi.string().min(5).required(),
});

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
}; 

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return product;
};

const update = async (id, name) => {
  const { error } = validateName.validate({ name });
  if (error) return { message: error.message };
  const searchProduct = await productsModel.findById(id);
  if (!searchProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const product = await productsModel.update(id, name);
  return product;
};

const remove = async (id) => {
  const findProduct = await productsModel.findById(id);
  if (!findProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
   await productsModel.remove(id);
  return findProduct;
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
  update,
  remove,
};