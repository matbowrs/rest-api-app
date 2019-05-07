const express = require('express');
const app = express();
const morgan = require('morgan');

const homeRoute = require('./api/routes/home');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// Logging package
app.use(morgan('dev'));

// Anything starting with /products in URL will be forwarded to 
// products.js file, so we do not need /products in the products.js
// It's like saying /products/products

app.use('', homeRoute);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// If we make it past the routes above, it means 
// we are not able to handle what the user is
// trying to access, so it's an error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); // Forward error request
});

app.use((error, req, res, next) => {
    res.status((error.status) || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;