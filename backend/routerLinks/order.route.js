const express = require("express");
const { Cart_model } = require("../model/cartmodel");
const { Product } = require("../model/productmodel");
const mongoose=require('mongoose');
const { Order_model } = require("../model/ordermodel");


require("dotenv").config();

const OrderRoute = express.Router();

OrderRoute.get("/get", async (req, res) => {
  // const { owner } = req.params;
  const {owner} =req.body;
  try {
    const data = await Order_model.find({ owner });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// POST request to create an order
OrderRoute.post('/create', async (req, res) => {
  const { owner, products, shippingAddress, paymentMethod, notes } = req.body;
  try {
    // Calculate total amount
    const totalAmount = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    // Create a new order
    const newOrder = new Order_model({
      owner,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      notes,
    });
    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = {
  OrderRoute,
};
