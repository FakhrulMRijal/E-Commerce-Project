const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema ({
    _id: {
        type : mongoose.Schema.Types.ObjectId,
    },
    items: {
        type: Array
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    total: {
        type: Number
    },
    payment : {
        type : String
    },
    createdAt: {
        type: String,
        required: true
    },
    updateAt: {
        type: String,
        required: true
    }
    // quantity: {
    //     type : Number,
    //     required : true
    // },
    // productId: {
    //     type : String,
    //     required: true
    // },
    // price: {
    //     type: Number,
    //     required: true,
    // },
    // productId :{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product'
    // },
    // createdAt: {
    //     type: new Date(),
    //     required: true,
    // },
    // updatedAt: {
    //     type: new Date(),
    //     required: true
    // }
}, {

})

//  mongoose.model('Products', orderSchema)

module.exports =  mongoose.model('Orders', ordersSchema)
