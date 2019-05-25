const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Order = require('../models/orderModel');
const Product = require('../models/productModel');

router.get('/', (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    // First arg is what you want to populate, second is like .select()
    .populate('product', '_id name price') 
    .exec()
    .then(docs => {

        if (docs.length > 0)
            res.status(200).json({
                numberOfOrders: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            description: 'Get more information about a specific order',
                            'url': 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            });
        else 
            res.status(404).json({
                message: 'No orders to be displayed'
            });
    
       
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    });


});

// with an id
router.get('/:ordersID', (req,res,next) => {
    const id = req.params.ordersID; 

    Order.findById(id)
    .select('_id quantity product')
    .populate('product', '_id name price') 
    .exec()
    .then(doc => {
        console.log(doc); 
        if (doc)
            res.status(200).json(doc);
        else
            res.status(404).json({
                message: 'Order could not be found',
                type: 'GET',
                description: 'Get all orders',
                url: 'http://localhost:3000/orders'
            });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    });
});

router.post('/', (req,res,next) => {

    // Check if product exists before adding it to an order
    Product.findById(req.body.productID)
    // If it does, create the order
    .then(product => {
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            product: req.body.productID,
            quantity: req.body.quantity
        });
        return order
                .save()
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Order successfully created',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                'type': 'GET',
                'description': 'Get more information about this order',
                'url': 'http://localhost:3000/orders/' + result._id
            }
        });
    })
    .catch( err => {
        res.status(500).json({
            message: 'Product does not exist',
            error: err
        })
    });
});


router.delete('/:ordersID', (req,res,next) => {
    const id = req.params.ordersID; 

    Order.remove({
        _id: id
    })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Order deleted'
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error,
            type: 'GET',
            description: 'Get all orders',
            url: 'http://localhost:3000/orders'
        });
    });
    
});
module.exports = router;
