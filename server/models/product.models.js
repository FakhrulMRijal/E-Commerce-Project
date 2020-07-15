const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema ({
    title: {
        type : String,
        required : true 
    },
    detail: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    total: {
        type: Number
    }
}, {
    timestamps: true
})

//  mongoose.model('Products', productsSchema)

module.exports =  mongoose.model('Products', productsSchema)
