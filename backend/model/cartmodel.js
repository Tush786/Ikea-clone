const mongoose = require("mongoose");

const Schemas = mongoose.Schema;



const CartSchema = new Schemas(
  {
    productName: {
      type: String,
      required:true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    retailPrice: {
      type: Number,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
    },
    imagesurl:{
      type:[String],
      require: true,
    },
    
    colorShema:{
      type:[String],
      require: false,
    },
   
    rateComments: {
      type: [String], 
      default: [],
    },
    rateCount: { type: Number, default: 0 },  
    rateTotal: { type: Number, default: 0 },  
    rate: { type: Number, default: 0 },       
    stock: {
      type: Number,
      required: [true, "Stock is required"],
    }  
  }
);

const CartModel = mongoose.model("carts", CartSchema);
module.exports = {CartModel};