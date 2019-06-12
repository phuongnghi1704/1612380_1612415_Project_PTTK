var express = require('express');
var router = express.Router();
const productDao = require('../models/dao/productDao');

/* GET users listing. */
router.get('/about', async function(req, res, next) {

    res.render('home/about', {
        pageTitle: 'Liên hệ',
        curCustomer: req.user
    });
});

module.exports = router;
