const express = require('express');
const app = express();
const products = require('./routes/product');
const auth = require('./routes/auth');
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

//routes
app.use('/api/v1/', products);
app.use('/api/v1/', auth);

//Middleware for error handling
app.use(errorMiddleware);

module.exports = app;