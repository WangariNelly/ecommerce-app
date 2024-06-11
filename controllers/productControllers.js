const Product = require('../models/products');
exports.getProducts = (req, res) => {
    // const product = Product.find({});
    res.status(200).json({ message: `success`});
}

exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({ message: `success`, product});
}













// exports.getProducts =  (req, res) => {
//     const products = [
//       { id: 1, name: 'Product 1' },
//       { id: 2, name: 'Product 2' },
//       { id: 3, name: 'Product 3' },
//     ];
//     res.json(products);
//   };
  