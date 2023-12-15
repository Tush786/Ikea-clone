const express=require("express");
const cors=require("cors")
const { getData, cartData } = require("../cartPage/cart");
const router=express.Router();
router.use(cors({
    origin:"*"
}))

router.get('/cartpage',cartData)

module.exports={router}