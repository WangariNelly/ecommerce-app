const Product = require('../models/products');


exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({ message: `success`, product});
}

exports.getProducts = (req, res) => {
    res.status(200).json({ message: `success`});
}
