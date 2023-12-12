const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
      trim: true,
    },
    sellingPrice: {
      type: Number,
      required: [true, "Unit Price is required"],
    },
    retailPrice: {
      type: Number,
      required: [true, "Unit Price is required"],
    },
    category_id: {
      type: String,
      required: [true, "Category ID is required"],
    },
    imagePath1: { type: String, default: "" },
    imagePath2: { type: String, default: "" },
    imagePath3: { type: String, default: "" },
    rateCount: { type: Number, default: 0 },  //  Total point product got from its ratings --> 3+2+4+5...
    rateTotal: { type: Number, default: 0 },  //  How many people rated --> If 5 people rated, this value is 5
    rate: { type: Number, default: 0 },       
    stock: {
      type: Number,
      required: [true, "Stock is required"],
    }  
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = {Product,ProductSchema};