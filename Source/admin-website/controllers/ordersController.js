const orderDao = require('../models/dao/orderDao');
const mongoose = require('mongoose');
exports.order_list= async function(req,res)
{
    const name = req.user.info.name;
    const order = await orderDao.get_Order();
    res.render('orders/list', { pageTitle: 'Danh sách hóa đơn',
        orderList: order,
        nameAdmin: name,
       });
};


exports.order_update_get= async function(req, res){
    const orderInfo = await orderDao.get_Order_By_ID(req.params.id);
    const name = req.user.info.name;

    res.render('orders/update', { pageTitle: 'Cập nhật đơn hàng',
        order: orderInfo,
        isCreditCard: orderInfo.payment === 'Credit card',
        isShipCod: orderInfo.payment === 'Ship COD',
        isShipping: orderInfo.status === 'Đang giao',
        isShipped: orderInfo.status === 'Đã giao',
        isNotShip: orderInfo.status === 'Chưa giao',
        nameAdmin: name
    });

};

exports.order_update_post = async function(req, res){
  const orderInfo = await orderDao.get_Order_By_ID(req.params.id);

  if(orderInfo == null)
      res.status(404).send();

  orderInfo.totalPrice = req.body.totalPrice;
  orderInfo.status = req.body.status;
  orderInfo.payment = req.body.payment;

  orderInfo.save(err => {
     if(err) throw err;
     res.redirect('../list');
  });
};

exports.order_delete = async function(req, res){
    const orderInfo = await orderDao.get_Order_By_ID(req.params.id);

    if(orderInfo == null)
        res.status(404).send();

    orderInfo.isDeleted = true;

    orderInfo.save(err => {
        if(err) throw err;
        res.redirect('../list');
    });
};

exports.order_getCustomerInfo = async (req,res) =>{
    const customerInfo = await orderDao.get_CustomerInfo_By_ID(req.params.id);
    res.json(customerInfo);
};

exports.order_getProductInfo = async (req,res) => {
    const productInfo = await orderDao.get_Order_By_ID(req.params.id);
    res.json(productInfo);
};