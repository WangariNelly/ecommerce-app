const Product = require('../models/products');
const ErrorHandler = require('../utils/errorHandler');


exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({ message: `success`, product});
}

exports.getProducts = async(req, res, next) => {
    const products = await Product.find();
    res.status(200).json({ message: `success`, products});
}

//single product
exports.getProduct = async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not Found!', 404));
    }
        res.status(200).json({ message: `success`, product});
}
//update

exports.updateProduct = async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({ message: `Product not found`});
    }     
product = await Product.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true,
    useFindAndModify: false,
});
res.status(200).json({ message: `success`, product});
}

//delete product
exports.deleteProduct = async(res, req, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({ message: `Product not found`});
    }     
  await product.remove();
    res.status(200).json({ message: `Deleted product`});
};



