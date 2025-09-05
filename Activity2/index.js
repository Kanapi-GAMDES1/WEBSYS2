const express = require('express');
const app = express();

const productRoutes = require('./src/products/products-routes');
const customerRoutes = require('./src/customers/customers-routes');
const orderRoutes = require('./src/orders/orders-routes');

app.use(express.json());

app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

app.listen(3000, () =>{
    console.log('Server has started on http://localhost:3000')
});