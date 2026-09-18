import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import razorpay from 'razorpay';
import mongoose from 'mongoose';
import { sendOrderConfirmationEmail } from "../config/emailService.js";

// Global variables / Gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_dummy'
});

// Helper for 5-day delivery calculation (5 days = 5 * 24 * 60 * 60 * 1000 ms)
const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const now = Date.now();
        const deliveryDate = now + FIVE_DAYS_MS;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: now,
            deliveryDate: deliveryDate
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        if (mongoose.Types.ObjectId.isValid(userId)) {
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
        }

        // Trigger confirmation email
        sendOrderConfirmationEmail(orderData);

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const now = Date.now();
        const deliveryDate = now + FIVE_DAYS_MS;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: true, // Auto-mark paid for demo/test mode
            date: now,
            deliveryDate: deliveryDate
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        if (mongoose.Types.ObjectId.isValid(userId)) {
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
        }

        // Trigger confirmation email
        sendOrderConfirmationEmail(orderData);

        res.json({ success: true, message: "Stripe Order Placed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const now = Date.now();
        const deliveryDate = now + FIVE_DAYS_MS;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: true, // Auto-mark paid for demo/test mode
            date: now,
            deliveryDate: deliveryDate
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        if (mongoose.Types.ObjectId.isValid(userId)) {
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
        }

        // Trigger confirmation email
        sendOrderConfirmationEmail(orderData);

        res.json({ success: true, message: "Razorpay Order Placed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// User Order Data For Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };
