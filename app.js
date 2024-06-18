const express = require('express');
const app = express();
const products = require('./routes/product')

//middlewares
app.use(express.json());

//routes
app.use('/api/v1/', products);



module.exports = app;