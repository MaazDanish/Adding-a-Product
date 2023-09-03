const express = require('express');

const router = express.Router();
const controller = require('../Controller/Product');

router.get('/add-product',controller.getAddProduct);
router.post('/add-product',controller.postAddProduct);
router.post('/delete-product',controller.deleteProduct);

module.exports = router;