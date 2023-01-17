const validationProductId = (req, res, next) => {
  const [{ productId }] = req.body;
  if (!productId) {
   return res.status(400).json({ message: '"productId" is required' });
  }
  //  const validation = req.body.some((item) => Object.keys(item.productId));
  // if (validation || !req.body.includes(Object.keys('productId'))) {
  //   return res.status(404).json({ message: 'Product not found' });
  // }
  next();
};

module.exports = {
  validationProductId,
};