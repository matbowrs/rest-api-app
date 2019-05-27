const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

router.get('/', ProductsController.products_get_all);
router.get('/:productID', ProductsController.products_get_single_product);
router.post('/', checkAuth, ProductsController.products_create_new_product);
router.patch('/:productID', checkAuth, ProductsController.products_update_product);
router.delete('/:productID', checkAuth, ProductsController.products_delete_product);

module.exports = router;
