const express = require("express");
const { Cart_model } = require("../model/cartmodel");
const { Product } = require("../model/productmodel");



require("dotenv").config();

const Cartrouter = express.Router();

Cartrouter.get("/get", async (req, res) => {
  const { owner } = req.body;
  try {
    // console.log(req);
    const data = await Cart_model.find({ owner });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

Cartrouter.post("/create", async (req, res) => {
  const { product, quantity, owner, id } = req.body;
  try {
    let cart = await Cart_model.findOne({ owner });
    console.log(cart);

    if (!cart) {
      cart = new Cart_model({ owner, orderItems: [] });
      await cart.save();
    }
    console.log(id);
    console.log(quantity);
    if (quantity <= 0) {
      cart.orderItems = cart.orderItems.filter(
        (item) => item._id.toString() !== id.toString()
      );
      await cart.save();
    }

    let productdata = await Product.findById(product._id);
    console.log(productdata);
    if (!productdata) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Check if the product is already in the cart
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
      const newItem = { product: productdata, quantity };

      cart.orderItems.unshift(newItem);
    }

    const newCart = await cart.save();
    res.json(newCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

Cartrouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { owner } = req.body;
  
  try {
    // Find the cart by owner
    let cart = await Cart_model.findOne({ owner });
    
    console.log(id)
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    // Delete the cart item by its ID
    // const cartUpdate = await Cart_model.findByIdAndDelete({_id:id});
    cart.orderItems = cart.orderItems.filter(
      (item) => item._id.toString() !== id.toString()
    );
    await cart.save();

    if (!cartUpdate) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



module.exports = {
  Cartrouter,
};
