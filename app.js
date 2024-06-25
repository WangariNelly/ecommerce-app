const express = require('express');
const app = express();
const products = require('./routes/product');
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

//routes
app.use('/api/v1/', products);

//Middleware for error handling
app.use(errorMiddleware);

module.exports = app;