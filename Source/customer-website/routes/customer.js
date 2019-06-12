const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const customerDao = require('../models/dao/customerDao');
//Require controller modules
const customer_Controller = require('../controllers/customerController');

//GET register
router.get('/register',customer_Controller.customer_register_get);

//POST register
router.post('/register',customer_Controller.customer_register_post);

router.post('/register/checkUsername',customer_Controller.customer_check_username);

//VERIFY

router.post('/verify',customer_Controller.customer_verify_post);
router.get('/verify',customer_Controller.customer_verify_get);

//GET login page
router.get('/login',function(req,res,next){
    const errorMessages = res.locals.error[0];
    const successMsg = res.locals.success_msg[0];
    res.render('customer/login',{
        errorMessages: errorMessages,
        successMsg: successMsg});
});

//POST login
//router.post('/login', customer_Controller.customer_login_post);
router.post('/login', passport.authenticate('local.signin',{
    failureRedirect: '../login',
    failureFlash:true,
}),function(req,res){
    if(req.session.oldUrl){
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else
    {
        res.redirect('/');
    }
});

//logout
router.get('/logout',function(req,res,next){
   req.logout();
   res.redirect('/');
});

//GET forgot password page
router.get('/forgotPassword', customer_Controller.forgotPassword_index);

//GET order page
router.get('/orders',isLoggedIn, customer_Controller.customer_orders);

//GET credit cart checkout page
router.get('/checkout',isLoggedIn, customer_Controller.checkout_get);

//POST credit card checkout page
router.post('/checkout',isLoggedIn, customer_Controller.checkout_post);

//GET credit cart checkout page
router.get('/checkoutCOD',isLoggedIn, customer_Controller.checkoutCOD_get);

//POST credit card checkout page
router.post('/checkoutCOD',isLoggedIn, customer_Controller.checkoutCOD_post);



//GET thank you page
router.get('/thankyou',isLoggedIn, customer_Controller.thank_you);

//GET update profile
router.get('/updateProfile',isLoggedIn, customer_Controller.customer_updateProfile_get);

//POST update profile
router.post('/updateProfile',isLoggedIn, customer_Controller.customer_updateProfile_post);

//POST reset password
router.post('/forgotPassword/reset', customer_Controller.customer_resetPassword);

module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Xin hãy đăng nhập !!');
    req.session.oldUrl = req.url;
    res.redirect('/login');
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
