const Product = require('../Model/Product');
// Getting the product details from page t the db
exports.getAddProduct = (req, res, next) => {
    Product.findAll()
    .then(product => {
        res.json(product);
    })
    .catch(err=>console.log(err));
}

// exports.postAddProduct = (req, res, next) => {
//     const title = req.body.productName;
//     const price = productStore.price;
//     Product.create({
//         productName: title,
//         price: price
//     }).then(data => {
//         return res.json(data);
//     }).catch(err => console.log(err));
// }

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.id;  
    Product.findByPk(prodId)
        .then((product) => {
            return product.destroy();
        })
        .then(() => {
            console.log('sUCCCESFULLYB deLETED ----------------;;;;;;;;;;;');
            res.redirect('/add-product')
        }).catch(err => console.log(err));
}