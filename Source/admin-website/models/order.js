const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   infoCustomer: {
           name: String,
           address: String,
           sdt: String,
           email: String
       }
,
    payment: {type: String, enum:['Ship COD','Credit card']},
    totalPrice: Number,
    created: Date,
    productList:[
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    isDeleted: Boolean,
    status: {type: String, enum: ['Đã giao', 'Đang giao', 'Chưa giao']}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;