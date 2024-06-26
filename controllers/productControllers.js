const Product = require("../models/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

exports.newProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user= req.user.id;   //adds user in products
  
  const product = await Product.create(req.body);
  res.status(201).json({ message: `success`, product });
});

//get all products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

  const resPerPage = 2;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
                      .search()
                      .filter()
                      .pagination(resPerPage)

  const products = await apiFeatures.query;
  res.status(200).json({ 
    success: true,
   count: products.length,
   productCount,
   products
  });
});

//single product
exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found!', 404));
  }
  res.status(200).json({ success: true, product });
});
//update

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found!', 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ message: `success`, product });
});

//delete product
exports.deleteProduct = catchAsyncErrors(async (res, req, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found!', 404));
  }
  await product.remove();
  res.status(200).json({ message: `Deleted product` });
});
 