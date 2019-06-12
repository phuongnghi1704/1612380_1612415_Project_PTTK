const Order = require('../order');

exports.get_Order = () =>{
  return Order.find({isDeleted: false});
};

exports.get_Order_By_ID = id => {
  return Order.findOne({isDeleted: false, _id: id});
};

exports.get_CustomerInfo_By_ID = id => {
  return Order.findOne({isDeleted: false, _id: id},'infoCustomer');
};

exports.get_ProductInfo_By_ID = id =>{
  return Order.findOne({isDeleted: false, _id: id}, 'productList');
};