const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const specificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});

const ProductSchema = new Schema(
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
    category_id: { type: Schema.Types.ObjectId, ref: 'Category',type:String, required: false },
    imagesurl:{
      type:[String],
      require: false,
    },
    hoverimg:{
      type:String,
      required:false
    },
    colorShema:{
      type:[String],
      require: false,
    },
    specifications: {
      type: [specificationSchema], 
      required: false,
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
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = {Product,ProductSchema};


// Sample Data for Specification
// "specifications": [
//   {"name": "Size", "value": "Medium"},
//   {"name": "Weight", "value": "1.5 kg"},
//   {"name": "Material", "value": "Cotton"}
// ]

// Sample Data for Comment
// {
//   "productName": "Sample Product",
//   "rateComments": ["Great product!", "Love the quality", "Highly recommended"]
//   // ... other fields
// }

// <-------------Sample Data According to Schema ------------------------->

const sampleProduct = {
  productName: "Sample Product",
  description: "This is a sample product description.",
  sellingPrice: 29.99,
  retailPrice: 39.99,
  category_id: "123456", // Replace with an actual category ID
  imagesurl: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ],
  colorShema: ["Red", "Blue", "Green"],
  specifications: [
    { name: "Size", value: "Medium" },
    { name: "Weight", value: "1.5 kg" },
    { name: "Material", value: "Cotton" },
  ],
  rateComment: "This product is great!",
  rateCount: 5, // Assuming 5 people rated the product
  rateTotal: 18, // Total rating points received
  rate: 3.6, // Average rating (rateTotal / rateCount)
  stock: 50,
};

// // Assuming you have a Mongoose model named Product
// const Product = mongoose.model('Product', ProductSchema);

// // Create a new product using the sample data
// const newProduct = new Product(sampleProduct);

// // Save the product to the database
// newProduct.save()
//   .then((result) => {
//     console.log("Sample product created:", result);
//   })
//   .catch((error) => {
//     console.error("Error creating sample product:", error);
//   });
