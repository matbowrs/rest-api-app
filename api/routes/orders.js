const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json( {
        message: 'Handling GET requests on orders'
    });
});


router.post('/', (req,res,next) => {
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Create order',
        order: order
    });
});


// with an id
router.get('/:ordersID', (req,res,next) => {
    const id = req.params.ordersID; 
    res.status(200).json({
        message: 'Order details',
        id: id
    });
});

router.delete('/:ordersID', (req,res,next) => {
    const id = req.params.ordersID; 
    res.status(200).json({
        message: 'Order deleted',
        id: id
    });
});
module.exports = router;
