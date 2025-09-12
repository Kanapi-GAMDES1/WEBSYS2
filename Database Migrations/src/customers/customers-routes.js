const express = require('express');
const router = express.Router();
const { getAllCustomers, getCustomerById } = require('./customers-controller');

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);

module.exports = router;
