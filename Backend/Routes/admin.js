const express = require('express');

const router = express.Router();
const controller = require('../Controller/Product');
const Product = require('../Model/Product');


router.get('/add-product',controller.getAddProduct);
router.post('/add-product', (req, res, next) => {
    const title = req.body.productName;
    const price = req.body.price;
   return Product.create({
        productName: title,
        price: price
    }).then(data => {
        return res.json(data);
    }).catch(err => console.log(err));

});
router.post('/delete-product',controller.deleteProduct);

module.exports = router;