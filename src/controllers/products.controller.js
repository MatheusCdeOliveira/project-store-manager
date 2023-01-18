const { productService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  if (product.type) return res.status(404).json({ message: product.message });
  res.status(200).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const products = await productService.update(id, name);
  if (products.type) return res.status(404).json({ message: 'Product not found' });
  if (products.message) return res.status(422).json({ message: products.message });
  res.status(200).json(products);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.remove(id);
  if (type) return res.status(404).json({ message });
  res.status(204).json();
};

const insert = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.insert({ name });
  if (newProduct.type) return res.status(422).json({ message: newProduct.message });
  res.status(201).json(newProduct);
};

module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove,
};