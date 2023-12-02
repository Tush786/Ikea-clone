const express=require("express");
const cors=require("cors")
const { getData } = require("../cartPage/cart");
const router=express.Router();
router.use(cors({
    origin:"*"
}))
router.get("/",getData);

module.exports={router}