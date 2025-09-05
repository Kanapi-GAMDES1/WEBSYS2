const express = require('express');
const router = express.Router();
const { getAllOrders, getOrderById } = require('./orders-controller');

router.get('/', getAllOrders);
router.get('/:id', getOrderById);

module.exports = router;
