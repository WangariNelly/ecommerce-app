const Order = require('../models/order');
const Products = require('../models/products');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//create new order /api/v1/order/new
exports.newOrder = catchAsyncErrors(async(req,res,next) => {
    const {
        orderItems,
        shippingInfo,
        taxPrice,
        totalPrice,
        paymentInfo,
        itemsPrice,
        shippingPrice
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        taxPrice,
        totalPrice,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.send(200).json({
        success: true,
        order
    })
})
