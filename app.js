const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mb:ayaya@rest-api-cluster-aiiyy.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

const homeRoute = require('./api/routes/home');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

// Logging package
app.use(morgan('dev'));

// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Handling CORS errors
// ... what?
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With', 
        'Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        
        return res.status(200).json({});
    }

})*/

// Anything starting with /products in URL will be forwarded to 
// products.js file, so we do not need /products in the products.js
// It's like saying /products/products
app.use('', homeRoute);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

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