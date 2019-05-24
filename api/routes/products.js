const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/productModel');

router.get('/', (req, res, next) => {
    res.status(200).json( {
        message: 'Handling GET reqests to /products'
    });
});

// 201 because it says 'everything is good, item was created'
router.post('/', (req,res,next) => {
    /*
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    */
   
    // new product object using mongoose
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
    .then(result => {
        console.log(result);
    })
    .catch( error => {
        console.log(error);
    });


    res.status(201).json( {
        message: 'Handling POST requests to /products',
        product: product
    });
});

// Get any ID after /products
router.get('/:productID', (req,res,next) => {
    const id = req.params.productID;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    });

});

// PATCH
router.patch('/:productID', (req,res,next) => {
    res.status(200).json({
        message: 'Product has been updated'
    });
});

// DELETE
router.delete('/:productID', (req,res,next) => {
    res.status(200).json({
        message: `You've deleted the product`
    })

});
module.exports = router;
