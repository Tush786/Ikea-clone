const express = require("express");
const { Product } = require("../model/productmodel");

const productRouter = express.Router();
// Create Product
productRouter.post("/api/product", async (req, res) => {
  const {
    productName,
    description,
    sellingPrice,
    retailPrice,
    categoryID,
    stock,
    imagePath1,
    imagePath2,
    imagePath3,
    imagePath1color,
    imagePath2color,
    imagePath3color,
    hoverImge
  } = req.body;

  if (
    !validateReqBody(
      productName,
      description,
      sellingPrice,
      retailPrice,
      categoryID,
      stock,
      imagePath1,
      imagePath2,
      imagePath3,
      imagePath1color,
      imagePath2color,
      imagePath3color,
      hoverImge
    )
  ) {
    return res.status(401).send({
      status: false,
      type: "INVALID",
      error: "invalid request body",
    });
  }
  try {
    const newProduct = new Product({
      productName,
      description,
      sellingPrice,
      retailPrice,
      imagePath1,
      imagePath2,
      imagePath3,
      imagePath1color,
      imagePath2color,
      imagePath3color,
      categoryID,
      stock,
      rate: 0,
      rateCount: 0,
      rateTotal: 0,
      hoverImge
    });
    await newProduct.save();
    res.status(200).send({ status: true, product: newProduct });
  } catch (error) {
    return res.status(401).send({
        status: false,
        type: "INVALID",
        error: "invalid request body",
      });
  }  
});

// DELETE products.
productRouter.delete("/api/product/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).send({
      status: false,
      type: "INVALID",
      error: "Invalid request parameter, id",
    });
  }
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send({ status: false, error: "Invalid request parameter, id", });
    }
    return res.status(201).send({ status: true, id });
  } catch (error) {
    return res
      .status(401)
      .send({ status: false, error });
  }
});

// GET all products
productRouter.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).send({ status: true, products });
  } catch (error) {
    return res
      .status(401)
      .send({ status: false, error });
  }
});

// GET a product
productRouter.get("/api/product/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).send({
      status: false,
      type: "INVALID",
      error: "Invalid request parameter, id",
    });
  }

  try {
    let product = await Product.findById(id); //Pass the id of the product that is wanted
    if (!product) {
      throw Error(`no product found ${id}`);
    }
    product = product.toObject();
    return res.status(200).send({ status: true, product });
  } catch (error) {
    return res
      .status(401)
      .send({ status: false, error});
  }
});





module.exports = { productRouter };