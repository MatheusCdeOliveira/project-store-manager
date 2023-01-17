const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findById(id);
  if (sale.type) return res.status(404).json({ message: 'Sale not found' });
  res.status(200).json(sale);
};

const insert = async (req, res) => {
  const newSale = req.body;
  const sales = await salesService.insert(newSale);
  if (sales.type) return res.status(404).json({ message: 'Product not found' });
  res.status(201).json(sales);
};

module.exports = {
  getAll,
  insert,
  findById,
};