const express = require("express");
const { Cart_model } = require("../model/cartmodel");
const { Product } = require("../model/productmodel");
const mongoose=require('mongoose');


require("dotenv").config();

const Cartrouter = express.Router();

Cartrouter.get("/get", async (req, res) => {
  // const { owner } = req.params;
  const {owner} =req.body;
  try {
    const data = await Cart_model.find({ owner });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

Cartrouter.post("/create/:id", async (req, res) => {
  const { product, quantity, owner} = req.body;
  // console.log("line no 24",owner)
  const {id}=req.params;
  try {
    let cart = await Cart_model.findOne({ owner });


    if (!cart) {
      cart = new Cart_model({ owner, orderItems: [] });
      await cart.save();
    }
  
    if (quantity <= 0) {
      cart.orderItems = cart.orderItems.filter(
        (item) => item._id.toString() !== id.toString()
      );
      await cart.save();
    }

    let existingItem = cart.orderItems.find(
      (item) => item.product._id.toString() === product._id.toString()
    );

    if (existingItem) {
      cart.orderItems = cart.orderItems.map((item) =>
        item.product._id.toString() === product._id.toString()
          ? { ...item, quantity }
          : item
      );
    } else {
      // If the product is not in the cart, add it as a new item
      const newItem = { product: product, quantity };

      cart.orderItems.unshift(newItem);
    }

    const newCart = await cart.save();
    res.json(newCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

Cartrouter.delete("/delete/:productId", async (req, res) => {
  const { productId } = req.params;
  const {owner} =req.body;
  try {
    const cartDocument = await Cart_model.findOneAndUpdate(
      { owner: owner },
      {
        $pull: {
          orderItems: { 'product._id': productId }
        }
      },
      { new: true }
    );

    if (!cartDocument) {
      return res.status(404).send({
        status: false,
        type: "NOT_FOUND",
        error: "Product not found for the specified owner.",
      });
    }

    return res.status(200).send({ status: true, cart: cartDocument });
  } catch (error) {
    return res.status(500).send({
      status: false,
      type: "SERVER_ERROR",
      error: error.message,
    });
  }
});

module.exports = {
  Cartrouter,
};
