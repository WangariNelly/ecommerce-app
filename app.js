const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors');
app.use(express.json());

const products = require('./routes/product');

//routes
app.use('/api/v1/', products);

//Middleware for error handling
app.use(errorMiddleware);

module.exports = app;