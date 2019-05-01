const express = require('express');
const app = express();


const productRoutes = require('./api/routes/products');

// Anything starting with /products in URL will be forwarded to 
// products.js file, so we do not need /products in the products.js
// It's like saying /products/products
app.use('/products', productRoutes);

module.exports = app;