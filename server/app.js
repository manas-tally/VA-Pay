const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const orderModel = require('./model');
const { createId, init } = require('@paralleldrive/cuid2');
const createOrderID = init({ length: 6 });

require('dotenv').config();
app.use(cors());
app.use(express.json());

mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => console.log('✅ MongoDB Connected!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend working on PORT ${PORT} 🌏`);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/generate-order', async (req, res) => {
    const newOrder = new orderModel({
        orderID: createOrderID(),
        orderDetails: req.body.OrderDetails,
        orderAmount: req.body.Amount,
        orderStatus: 'pending',
        orderPaymentURL: createId(),
        transactionHistory: [],
    });

    try {
        await newOrder.save();

        res.send({
            status: 'OK',
            orderDetails: newOrder,
        });
    } catch (err) {
        console.log(`❌ Error: ${err}`);
        res.send({
            status: 'FAILED',
            message: 'Something went wrong! Please try again later.',
        });
    }
});

app.post('/get-order', async (req, res) => {
    const orderID = req.body.orderID;

    try {
        const order = await orderModel.findOne({ orderID });

        if (order == null) {
            res.send({
                status: 'FAILED',
                message: 'Order ID not found!',
            });
        } else {
            res.send({
                status: 'OK',
                orderDetails: order,
            });
        }
    } catch (err) {
        console.log(`❌ Error: ${err}`);
        res.send({
            status: 'FAILED',
            message: 'Something went wrong! Please try again later.',
        });
    }
});

app.get('/pay/:orderPaymentURL', async (req, res) => {
    const { orderPaymentURL } = req.params;

    try {
        const order = await orderModel.findOne({ orderPaymentURL });

        if (order == null) {
            res.send({
                status: 'FAILED',
                validity: -1,
                message: 'Payment Link Expired or Invalid',
                orderDetails: {},
            });}
        else if(order.orderStatus == 'success'){
            res.send({
                status: 'OK',
                validity: 1,
                message: 'Payment Link Expired or Invalid',
                orderDetails: {
                    orderDetails: order.orderDetails,
                    orderAmount: order.orderAmount,
                },
            });
        } else {
            res.send({
                status: 'OK',
                validity: 0,
                message: "Payment Pending",
                orderDetails: {
                    orderDetails: order.orderDetails,
                    orderAmount: order.orderAmount,
                },
            });
        }
    } catch (err) {
        console.log(`❌ Error: ${err}`);
        res.send({
            status: 'FAILED',
            message: 'Something went wrong! Please try again later.',
        });
    }
});

app.post('/make-payment/:orderPaymentURL', async (req, res) => {
    const { orderPaymentURL } = req.params;
    const transactionID = createId();
    const transactionStatus = req.body.transactionStatus;
    const transactionTimestamp = new Date();
    const transactionMethod = req.body.transactionMethod;

    try {
        const order = await orderModel.findOne({ orderPaymentURL });

        if (order == null || order.orderStatus == 'success') {
            res.send({
                status: 'FAILED',
                message: 'Payment Link Expired or Invalid',
            });
        } else {
            const transaction = {
                transactionID,
                transactionStatus,
                transactionTimestamp,
                transactionMethod,
            };

            order.transactionHistory.push(transaction);

            if (transactionStatus == 'success') order.orderStatus = 'success';
            else order.orderStatus = 'failed';

            await order.save();

            res.send({
                status: 'OK',
                orderDetails: transaction,
            });
        }
    } catch (err) {
        console.log(`❌ Error: ${err}`);
        res.send({
            status: 'FAILED',
            message: 'Something went wrong! Please try again later.',
        });
    }
});
