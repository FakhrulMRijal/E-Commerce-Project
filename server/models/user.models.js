const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    phone: {
        type: Number,
    },
    token: {
        type: String
    },
    message: {
        type : String
    },
}, {
    timestamps : true
});

module.exports =  mongoose.model('User', UserSchema)