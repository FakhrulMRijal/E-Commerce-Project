const router = require('express').Router()
// const order = require('../models/order.models')
const Product = require('../models/product.models')

router.route('/').get((req, res) => {
    Product.find()
    // console.log(req.params.product)
        .then(products => {
            res.json(products)
            // console.log('PRODUCTS', products)  
        })
        .catch(err => res.status(400).json('Error : ' + err))
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const detail = req.body.detail;
    const price = Number(req.body.price);
    const category = req.body.category;
    const image = req.body.image;

    const newProducts = new Product ({
        title,
        detail,
        price,
        category,
        image,
    })

    newProducts.save()
        .then(() => res.json('New products success'))
        .catch(err => res.status(400).json('Error : ' + err))
})

router.route('/detail/:id').get((req, res) => {
    console.log('masuk')
    console.log('req.query: ', req.query)
    Product.findById(req.params.id)
        .then(products => {
            res.json(products)
        })
        .catch(err => res.status(400).json('Error : ' + err))
})

router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(products => {
            products.title = req.body.username,
            products.detail = req.body.email,
            products.price = Number(req.body.price),
            products.category = req.body.category,
            products.image = req.body.image;

            products.save()
                .then(() => res.json('Already updated'))
                .catch(err => res.status(400).json('Error : ' + err));
        })
        .catch(err => res.status(400).json('Error : ' + err))
})

router.route('/:id').delete((req,res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Products has been slained'))
        .catch(err => res.status(400).json('Error : ' + err))
})

router.route('/category/:category').get((req, res) => {
    Product.find({
        category: req.params.category
    })
    .then(products => {
        res.json(products)
        console.log('Products', products)
    })
    .catch(err => res.status(400).json('Error : ' + err))
})

router.route('/price/:price').get((req, res) => {
    Product.find({
        price: req.params.price
    })

    .then(products => {
        res.json(products)
        console.log('Products', products)
    })
    .catch(err => res.status(400).json('Error : ' + err))
})

router.route('/title/:title').get((req, res) => {
    Product.find({
        title: req.params.title
    })
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error : ' + err))
})

module.exports = router