const express = require('express');
const app = express();

const homeRoute = require('./api/routes/home');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// Anything starting with /products in URL will be forwarded to 
// products.js file, so we do not need /products in the products.js
// It's like saying /products/products

app.use('', homeRoute);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;