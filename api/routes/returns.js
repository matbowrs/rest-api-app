const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ReturnsController = require('../controllers/returns');

router.get('/', checkAuth, ReturnsController.returns_get_all);
router.get('/:returnID', checkAuth, ReturnsController.returns_get_return);
router.post('/', checkAuth, ReturnsController.returns_create_return);
router.delete('/:returnID', checkAuth, ReturnsController.returns_delete_return);

module.exports = router;

