const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('admin/welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    const name = req.user.info.name;
    res.render('dashboard', {
        admin: req.admin,
        nameAdmin: name
    })
});

module.exports = router;