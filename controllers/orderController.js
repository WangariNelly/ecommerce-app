const Order = require("../models/order");
const Products = require("../models/products");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors') 
const ErrorHandler = require("../utils/errorHandler");

//create new order /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    taxPrice,
    totalPrice,
    paymentInfo,
    itemsPrice,
    shippingPrice,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    taxPrice,
    totalPrice,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

//Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order Found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});


//Get logged in user orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
  
    res.status(200).json({
      success: true,
      orders,
    });
  });
  
