const products = require('../../products');

function getAllProducts(req, res) {
  let result = products;

  if (req.query.name) {
    const name = req.query.name;
    result = result.filter(p => p.name.includes(name));
  }

  if (req.query.description) {
    const description = req.query.description;
    result = result.filter(p => p.description.includes(description));
  }

  if (req.query.minPrice && req.query.maxPrice) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);
  }

  if (req.query.minStock && req.query.maxStock) {
    const minStock = req.query.minStock;
    const maxStock = req.query.maxStock;
    result = result.filter(p => p.stock >= minStock && p.stock <= maxStock);
  }

  res.json(result);
}

function getProductById(req, res) {
  const id = req.params.id;
  const product = products.find(p => p.id == id); 
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
}

module.exports = {
  getAllProducts,
  getProductById
};
