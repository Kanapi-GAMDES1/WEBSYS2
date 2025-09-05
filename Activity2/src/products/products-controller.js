const products = require('../../products');

function getAllProducts(req, res) {
  let result = products;

  if (req.query.name) {
    const name = req.query.name.toLowerCase();
    result = result.filter(p => p.name.toLowerCase() === name);
  }

  if (req.query.description) {
    const description = req.query.description.toLowerCase();
    result = result.filter(p => p.description.toLowerCase() === description);
  }

  if (req.query.minPrice && req.query.maxPrice) {
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);
  }

  if (req.query.minStock && req.query.maxStock) {
    const minStock = Number(req.query.minStock);
    const maxStock = Number(req.query.maxStock);
    result = result.filter(p => p.stock >= minStock && p.stock <= maxStock);
  }

  res.json(result);
}

function getProductById(req, res) {
  const id = String(req.params.id);
  const product = products.find(p => String(p.id) === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
}

module.exports = {
  getAllProducts,
  getProductById
};
