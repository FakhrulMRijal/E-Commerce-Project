const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const router = express.Router()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(session({secret : 'mysupersecret', resave: false, saveUninitialized: false}))

const db = require('./config/keys').mongoURI

//connect to Mongo
mongoose.connect(db,{ useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB is success'))
    .catch(err => console.log(err))

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products')
const orderRouter = require('./routes/orders')


app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/orders', orderRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

