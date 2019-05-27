const Product = require('../models/productModel');
const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    Product.find()
    .select('name price _id') // I will select these fields only
    .exec()
    .then(docs => {
        const response = {
            numberOfProducts: docs.length,
            products: docs
        }
        res.status(200).json(response);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
}

exports.products_get_single_product = (req,res,next) => {
    const id = req.params.productID;

    Product.findById(id)
    .select('_id name price')
    .exec()
    .then(doc => {
        console.log('From database', doc);
        
        if (doc) {
            res.status(200).json(doc);

        } else {
            res.status(404).json({
                message: 'Item not in database'
            });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    });

}

exports.products_create_new_product = (req,res,next) => {
    // new product object using mongoose
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
    .then(result => {
        console.log(result);

        res.status(201).json( {
            message: 'Product created successfully',
            // Just returning a new object, before it had a __v property, didn't need it
            product: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        });
    })
    .catch( error => {
        console.log(error);
        res.status(500).json( {
            error: error
        });
    });
}

exports.products_update_product = (req,res,next) => {
    const id = req.params.productID;

    const updateOperations = {};
    // If only 1 property were to be added
    for (const ops of req.body) {
        updateOperations[ops.propName] = ops.value
    }
    // Assumes that both properties would be changed
    //Product.update({_id: id}, {$set: {name: req.body.newName, price: req.body.newPrice }});

    Product.update({_id: id}, {$set: updateOperations})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product updated successfully',
            request: {
                type: 'GET',
                description: 'Get more information about the updated product',
                url: 'http://localhost:3000/products/' + id
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    });   
}

exports.products_delete_product = (req,res,next) => {
    const id = req.params.productID;
    
    // Remove any id with this criteria
    Product.remove({
        _id: id
    })
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json({
            status: 'Deleted successfully'
        });
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({error: error});
    });
}