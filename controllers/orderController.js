const Order = require("../models/order");
const Product = require("../models/products");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors') 
const ErrorHandler = require("../utils/errorHandler");
const order = require("../models/order");

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
    })
  });
  


//Get all orders by admin => /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({ user: req.user.id });

    let totalAmount = 0;
    order.forEach(order => {
      totalAmount += order.totalPrice
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      order,
    })
  });
  

  //Update/process  orders by admin => /api/v1/admin/orders/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order !== null) {
    console.log(order.orderStatus);
} else {
    console.log("Order is null or missing orderStatus property");
}

  if(order.orderStatus === 'Delivered'){
   return next (new ErrorHandler('Order Delivered already',400));
  }

  order.orderItems.forEach( async item => {
    await updateStock(item.product, item.quantity);
  })

  order.orderStatus = req.body.status,
  order.deliveredAt = Date.now()

  await order.save();

  res.status(200).json({
    success: true,
  })
});

async function updateStock(id, quantity){
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}