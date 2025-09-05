const orders = require('../../orders');

function getAllOrders(req, res) {
  let result = orders;

  if (req.query.status) {
    const status = req.query.status;
    result = result.filter(o => o.status === status);
  }

  if (req.query.minAmount && req.query.maxAmount) {
    const minAmount = req.query.minAmount;
    const maxAmount = req.query.maxAmount;
    result = result.filter(o => o.totalAmount >= minAmount && o.totalAmount <= maxAmount);
  }

  res.json(result);
}

function getOrderById(req, res) {
  const id = req.params.id;
  const order = orders.find(o => o.id == id); 
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json(order);
}

module.exports = {
  getAllOrders,
  getOrderById
};
