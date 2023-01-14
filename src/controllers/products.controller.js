const { productService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  // if (products.type) return res.status(404).json(products.message);
  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  if (product.type) return res.status(404).json({ message: product.message });
  res.status(200).json(product);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.insert({ name });
  res.status(201).json(newProduct);
};

module.exports = {
  getAll,
  findById,
  insert,
};