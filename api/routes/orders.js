const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);
router.get('/:ordersID', checkAuth, OrdersController.orders_get_single_order);
router.post('/', checkAuth, OrdersController.orders_delete);
router.delete('/:ordersID', checkAuth, OrdersController.orders_delete);

module.exports = router;
