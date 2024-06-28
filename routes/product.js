const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productControllers');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/products').get(isAuthenticatedUser, getProducts);
router.route('/product/:id').get(getProduct);
router.route('/admin/product/new').post(newProduct);
router.route('/admin/product/:id')
 .put(updateProduct)
  .delete(deleteProduct);


module.exports = router;    