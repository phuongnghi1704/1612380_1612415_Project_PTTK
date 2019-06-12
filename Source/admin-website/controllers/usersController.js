const Customer = require('../models/customer');
const customerDao = require('../models/dao/customerDao');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
var mongoose = require('mongoose');
var async = require('async');

exports.user_list= async function(req,res)
{
    const name = req.user.info.name;
    const customers=customerDao.get_Customer_List();
    res.render('users/list',
        {
            pageTitle: 'Danh sách tài khoản',
            customerList: await customers,
            nameAdmin: name
        });
};

exports.user_add_get=function(req,res)
{
    const name = req.user.info.name;
    res.render('users/add', { pageTitle: 'Thêm tài khoản',
        nameAdmin: name });
};

exports.user_add_post = function(req,res,next){
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
        let customer = new Customer({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            info: {
                name: req.body.name,
                address: req.body.address,
                sdt: req.body.sdt,
            },
        });
        customer.password=customer.generateHash(req.body.password);
        customer.save(function(error){
            if(error) throw error;
            res.redirect('list');
        });
    });
};

exports.user_update_get = async function(req,res) {
    const name = req.user.info.name;
    const customerInfo = await customerDao.get_Customer_By_Id(req.params.id);
    res.render('users/update', { pageTitle: 'Cập nhật tài khoản',
        customer: customerInfo,
        nameAdmin: name
    });
};
exports.user_update_post = function(req,res,next) {
    var customer = new Customer({
        _id: req.params.id,
        username: req.body.username,
        email: req.body.email,
        info: {
            name: req.body.name,
            address: req.body.address,
            sdt: req.body.sdt
        }
    });
    //customer.password=customer.generateHash(req.body.password);
    Customer.findByIdAndUpdate(req.params.id,customer,{},function(err){
        if(err){return next(err);}
        res.redirect('../list');
    })
};

exports.user_delete = function(req,res){
    Customer.findByIdAndRemove(req.params.id,function (err) {
        if(err){return next(err);}
        res.redirect("../list");
    })
};

exports.user_change_block = async (req, res) => {
    const customer = await customerDao.get_Customer_By_Id(req.params.id);

    if(customer == null)
        return;

    let data = {isBlocked: customer.isBlocked};

    customer.isBlocked = !customer.isBlocked;

    customer.save(err => {
        if(err) throw err;
        data.isBlocked = customer.isBlocked;
        res.json(data);
    });
};