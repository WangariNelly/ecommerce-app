const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getProduct, updateProduct, deleteProduct, createProductReview,getProductReviews, deleteReviews } = require('../controllers/productControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getProduct);
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/admin/product/:id')
 .put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
  .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);


router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(isAuthenticatedUser,getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser,deleteReviews);



module.exports = router;    