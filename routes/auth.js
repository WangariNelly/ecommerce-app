const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword, logout, getUserProfile, updatePassword, updateProfile, allUsers } = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/me/update').put(isAuthenticatedUser,updateProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);

//admin
 router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);



module.exports = router;