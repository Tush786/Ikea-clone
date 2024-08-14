const express = require("express");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const cors = require("cors");
const fs = require("fs");
const { body, validationResult } = require("express-validator");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const multer = require("multer");

const { Product } = require("../model/productmodel");
const { uploadOnCloudinary } = require("../Cloudinary/Cloudinary");
const upload = require("../middlwere/Multer");
// const upload = multer({ dest: "uploads/" });

const productRouter = express.Router();

// ===========================================================> For multiple images ==================================>
  productRouter.post("/add", upload, async (req, res) => {
    const {
        productName,
        description,
        sellingPrice,
        retailPrice,
        category_id,
        stock,
        colorShema,
        specifications,
        rateComments,
        rateCount
    } = req.body;

    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "Image files are required" });
        }

        const imageUploadPromises = req.files.map(file => uploadOnCloudinary(file.path));
        const imageUploadResults = await Promise.all(imageUploadPromises);

        // Filter out any failed uploads
        const imageUrls = imageUploadResults.filter(result => result).map(result => result.url);

        if (imageUrls.length === 0) {
            return res.status(400).json({ error: "Failed to upload images" });
        }

        const newProduct = new Product({
            productName,
            description,
            sellingPrice,
            retailPrice,
            imagesurl: imageUrls, // Save the array of image URLs
            category_id,
            stock,
            rate: 0,
            colorShema:["#3a4b66","#a3a2a1","#8b3b35","#e3d8c4","#7e8468"],
            specifications,
            rateCount,
            rateComments,
            rateTotal: 0,
        });

        await newProduct.save();
        res.status(200).send({ status: true, product: newProduct });
    } catch (error) {
        return res.status(401).send({
            status: false,
            type: "INVAL_id",
            error: error.message,
        });
    }
});




// DELETE products.
productRouter.delete("/product/:_id", async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    return res.status(401).send({
      status: false,
      type: "INVAL_id",
      error: "Inval_id request parameter, _id",
    });
  }
  try {
    const product = await Product.findBy_idAndDelete(_id);
    if (!product) {
      return res.status(404).send({ status: false, error: "Inval_id request parameter, _id", });
    }
    return res.status(201).send({ status: true, _id });
  } catch (error) {
    return res
      .status(401)
      .send({ status: false, error });
  }
});

// GET all products with pagination

productRouter.get("/products", async (req, res) => {
  try {
    const { searchParam, category, rating, price, page = 1, limit = 6 } = req.query;

    const filterobj = {};

    if (searchParam) {
      filterobj["$or"] = [
        { productName: { $regex: new RegExp("^" + searchParam, 'i') } },
        { description: { $regex: new RegExp(searchParam, 'i') } }
      ];
    }

    if (category) {
      filterobj["category_id"] = category;
    }

    let sortObj = {};
    if (rating) {
      sortObj['rateCount'] = rating === 'asc' ? 1 : -1;
    }
    if (price) {
      sortObj['sellingPrice'] = price === 'asc' ? 1 : -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const pipeline = [
      { $match: filterobj },
      ...(Object.keys(sortObj).length > 0 ? [{ $sort: sortObj }] : []),
      { $skip: skip },
      { $limit: parseInt(limit) }
    ];

    // Logging the pipeline for debugging
    console.log("Aggregation Pipeline:", JSON.stringify(pipeline, null, 2));

    const products = await Product.aggregate(pipeline);
    const totalProducts = await Product.countDocuments(filterobj);
    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).send({ status: true, products, totalPages, currentPage: page });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ status: false, error });
  }
});



// GET a product
productRouter.get("/product/:_id", async (req, res) => {
  const { _id } = req.params;
  // console.log(_id)
  if (!_id) {
    return res.status(401).send({
      status: false,
      type: "INVAL_id",
      error: "Inval_id request parameter, _id",
    });
  }

  try {
    let product = await Product.findOne({_id}); //Pass the _id of the product that is wanted
    if (!product) {
      throw Error(`no product found ${_id}`);
    }
    product = product.toObject();
    return res.status(200).send({ status: true, product });
  } catch (error) {
    return res
      .status(401)
      .send({ status: false, error});
  }
});

productRouter.patch("/product/update/:__id", async (req, res) => {
  const {__id} = req.params

  const {
    productName,
    description,
    sellingPrice,
    retailPrice,
    category_id,
    stock,
    hoverimg,
    colorShema,
    imagesurl,
  } = req.body;


  try {
    const updatedProduct = await Product.findBy_idAndUpdate(
      __id,
      {
        productName,
        description,
        sellingPrice,
        retailPrice,
        imagesurl,
        hoverimg,
        colorShema,
        category_id,
        stock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({
        status: false,
        type: "NOT_FOUND",
        error: "Product not found",
      });
    }

    res.status(200).send({ status: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: false,
      type: "SERVER_ERROR",
      error: "Internal server error"
    });
  }
});




module.exports = { productRouter };