const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionID: String,
    transactionStatus: String,
    transactionTimestamp: Date,
    transactionMethod: String,
});

const orderSchema = new mongoose.Schema({
    orderID: String,
    orderDetails: String,
    orderAmount: String,
    orderStatus: String,
    orderPaymentURL: String,
    transactionHistory: [transactionSchema],
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
