const express = require("express");
const { Cart_model } = require("../model/cartmodel");
const { Product } = require("../model/productmodel");
const mongoose=require('mongoose');
const { Order_model } = require("../model/ordermodel");
const nodemailer = require("nodemailer");
const { UserModel } = require("../model/usermodel");

require("dotenv").config();

const OrderConfirm = express.Router();

OrderConfirm.post('/paymentSuccess/:owner', async (req, res) => {
    const { owner } = req.params;
    console.log("Owner ID",owner,"line no 80")
    try {
      const orders = await Order_model.find({ owner });
      // Ensure there are orders and get the last order
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
      const lastOrder = orders[orders.length - 1];
      const user = await UserModel.findById(owner);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.GMAIL,
        to: user.email,
        subject: "Order Confirmation",
        html: `
          <h1>Thank You for Your Order!</h1>
          <p>Hi ${user.fullName},</p>
          <p>Your order has been placed successfully. Here are your order details:</p>
          <h2>Order Summary</h2>
          <ul>
            ${lastOrder.products
              .map(
                (item) => `
              <li>
                <strong>Product Name:</strong> ${item.product.productName} <br/>
                <strong>Quantity:</strong> ${item.quantity} <br/>
                <strong>Price:</strong> ₹${item.product.sellingPrice} <br/>
                <strong>Order Date:</strong> ${new Date(item.orderDate).toLocaleDateString()} <br/>
                <strong>Delivered At:</strong> ${new Date(item.deliveredAt).toLocaleDateString()}
              </li>
            `
              )
              .join("")}
          </ul>
          <p><strong>Total Amount:</strong> $${lastOrder.totalAmount}</p>
          <p><strong>Payment Status:</strong> ${lastOrder.paymentStatus}</p>
          <p><strong>Payment Method:</strong> ${lastOrder.paymentMethod}</p>
          <p><strong>Refund Status:</strong> ${lastOrder.refundStatus}</p>
          <p><strong>Notes:</strong> ${lastOrder.notes}</p>
          <p>We will notify you once your order is shipped.</p>
          <p>Thank you for shopping with us!</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        message: "Payment successful, confirmation email sent.",
      });
    } catch (error) {
      console.error("Error handling payment:", error);
      res.status(500).json({ message: "Failed to process payment" });
    }
  });

  module.exports = {
    OrderConfirm,
  };
  