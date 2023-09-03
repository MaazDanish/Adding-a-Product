const Product = require('../Model/Product');
// Getting the product details from page t the db
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.productName;
    const price = req.body.price;
    Product.create({
        productName: title,
        price: price
    }).then(data => {
        console.log('sucessfully created');
        res.redirect('/admin/add-product');
    }).catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then((product) => {
            return product.destroy();
        })
        .then(() => {
            console.log('sUCCCESFULLYB deLETED ----------------;;;;;;;;;;;');
            res.redirect('/admin/add-product')
        }).catch(err => console.log(err));
}