const mongoose = require('mongoose');
const Return = require('../models/returnModel');
const Product = require('../models/productModel');

exports.returns_get_all = (req, res, next) => {
    Return.find()
    .select('_id product shipping')
    .populate('product', '_id name price')
    .exec()
    .then(docs => {
        if (docs.length >= 1) {
            res.status(200).json({
                message: 'Returns fetched',
                numberOfReturns: docs.length,
                returnInformation: docs
            });
        } else {
            res.status(404).json({
                message: 'Returns not found'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.returns_get_return = (req, res, next) => {    
    const id = req.params.returnID;
    Return.findById(id)
    .select('_id product shipping')
    .populate('product', '_id name price')
    .exec()
    .then(doc => {
        
        if (doc) {
            res.status(200).json({
                message: 'Return fetched',
                returnInformation: doc
            });
        } else {
            res.status(404).json({
                message: 'Return not found'
            });
        }
        
        
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.returns_create_return = (req, res, next) => {
    const id = req.body.productID;

    Product.findById(id)
    .exec()
    .then(result => {
        if (result) {
            const returnOrder = new Return({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productID,
                shipping: req.body.shipping
            });
        
            returnOrder.save()
            .then(result => {
                res.status(201).json({
                    message: 'New return successfully created',
                    returnOrder: {
                        _id: result._id,
                        product: result.product,
                        shipping: result.shipping
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/returns/' + result._id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });

        } else {
            res.status(404).json({
                message: 'Product does not exist'
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.returns_delete_return = (req, res, next) => {
    const id = req.params.returnID;

    Return.findById(id)
    .exec()
    .then(result => {
        if (result) {
            Return.remove({
                _id: id
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Return successfully deleted'
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        } else {
            res.status(404).json({
                message: 'Return not found'
            });
        }
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

}