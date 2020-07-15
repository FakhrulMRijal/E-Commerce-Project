const router = require('express').Router()
const mongoose = require('mongoose')
const Order = require('../models/order.models');
const Product = require('../models/product.models');
const User = require('../models/user.models');
const stripe = require("stripe")('sk_test_51Gvn1gGYUF75srSDoSpzd6xMrxDm9YeEGysud27oHiOMWzfklkYseWQOiC28V2Ob5XjeEV8iGNkTC8YvROi3hTvo00T1EBPQ3v')
const { uuid } = require('uuidv4')

//  
// Create Order

router.post('/create',  (req, res) => {
    User.findById(req.body.userId)
        .then((userId) => {
            console.log('User==', req.body.userId)
            if (!userId) {
                res.status(404).json({
                    message : "User not found"
                })

            } else{
                res.status(200).json({
                    message : "Order alredy in database",
                    userOrder : {
                        userId : userId._id
                    }
                })
                // const order = new Order({
                //     _id : mongoose.Types.ObjectId(),
                //     items : req.body.items,
                //     total : req.body.total,
                //     userId : req.body.userId,
                //     createdAt : new Date(),
                //     updateAt : new Date()
                // })
                // console.log('ORDER=> ', order);
                // if(order.items.length === 0){
                //     res.status(404).json({
                //         message : 'Order Not found'
                //     })
                // } else {
                //     res.status(200).json({
                //         message : 'Order in Database'
                //         ,order
                //     })
                // }
            } 
        })
    Product.findById(req.body.productId)
        .then((product) => {
            console.log("product", req.body.items)
                
                if(req.body.items.length === 0){
                    return res.status(400).json({
                        message : 'Order Failed'
                    })
                } else {
                    const order =  new Order({
                    _id : mongoose.Types.ObjectId(),
                    items : req.body.items,
                    total : req.body.total,
                    payment : req.body.payment,
                    userId : req.body.userId,
                    createdAt : new Date(),
                    updateAt : new Date()   
                    })
                    return order.save()
                }
            })
            .catch((e) => {
            res.status(404).json({
                message : "Product Not Found"
            })
        })
})

//Stripe-APi

router.post('/stripe',  (req, res) => {
    // console.log('req.body: ', req.body.data);
    User.findById(req.body.data.userId)
        .then((userId) => {
            console.log('User==', req.body.data.userId)
            console.log('userId', userId)
            if (!userId) {
                res.status(404).json({
                    message : "User not found"
                })

            }
        })
    Product.findById(req.body.data.productId)
        .then((product) => {
            console.log("product", req.body.data.items)
            const idempotencyKey = uuid();
            const order =  new Order({
            _id : mongoose.Types.ObjectId(),
            items : req.body.data.items,
            total : req.body.data.total,
            payment : req.body.data.payment,
            userId : req.body.data.userId,
            createdAt : new Date(),
            updateAt : new Date()   
            })
            if(req.body.data.items.length === 0){
                return res.status(400).json({
                    message : 'Order Failed'
                })
            } else {
                console.log('ORDER', order)
                return stripe.customers.create({
                    email : req.body.data.token.email,
                    source : req.body.data.token.id
                }) .then(customer => {
                    console.log(customer)
                    stripe.charges.create({
                        amount : req.body.data.total,
                        currency : 'Rp',
                        customer : customer.id,
                        receipt_email : req.body.data.token.email,
                        description : req.body.data.items,
                    }, {idempotencyKey})
                    return order.save()
                })
                .then(result => res.status(201).json({ message : 'Successs'}))
                .catch(err => res.status(400).json({ message : 'Error'}))
            }
        })
        .catch((e) => {
            console.log('ERRORRR: ', e);
            res.status(404).json({
                message : "Product Not Found"
            })
    })
})



//Delete Order
router.delete('/:orderId', (req, res) => {
    Order.remove({ _id : req.params._id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order Deleted',
            request: {
                type : "DELETE",
                url : "http://localhost:5000/orders",
                body : { productId: "ID", quantity: "NUMBER"}
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
})


// GET ORDER LIST BY USERID
router.get('/', async (req, res) => {
    if (req.query.userId) {
        if (req.query.userId.length !== 24) {
            res.status(404).json({
                message: 'Invalid UserId'
            })
        }
        const user = await User.findById(req.query.userId)
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
        } else {
            const orders = await Order.find().where({
                userId: req.query.userId,
                // orderId: req.query.orderId
            })
    
            res.status(200).json({
                message: 'success',
                status: 'success',
                data: orders
            })
            // console.log('DATA===', orders)
        }
    } else {
        res.status(404).json({
            message: 'Invalid Query'
        })
    }
});

    
module.exports = router