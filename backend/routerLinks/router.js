const express=require("express");
const cors=require("cors")
const {cartDataPost, cartDataDelete, cartDataGet } = require("../cartPage/cart");
const router=express.Router();
router.use(cors({
    origin:"*"
}))

router.post('/cartpage',cartDataPost);
router.delete('/cartpage',cartDataDelete);
router.get('/cartpage',cartDataGet);




module.exports={router}