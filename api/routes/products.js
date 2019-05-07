const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json( {
        message: 'Handling GET reqests to /products'
    });
});

// 201 because it says 'everything is good, item was created'
router.post('/', (req,res,next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(201).json( {
        message: 'Handling POST requests to /products',
        product: product
    });
});

// Get any ID after /products
router.get('/:productID', (req,res,next) => {
    const id = req.params.productID;
    if (id === 'special') {
        res.status(200).json( {
            message: `You've found the Easter egg!`,
            id: id
        });
    } else {
        res.status(200).json({
            message: 'A standard message',
            id: id
        });
    }

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
