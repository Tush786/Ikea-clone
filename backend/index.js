const express=require("express");
const { connection } = require("./config/connection");
const { router } = require("./routerLinks/router");
const { productRouter } = require("./routerLinks/product.router");
require("dotenv").config();

const app=express();

app.use(express.json());
app.use("",router);
app.use("/productsapi",productRouter)

app.listen(process.env.PORT,async()=>{
try{
await connection
console.log("connection")
}catch(err){
    console.log(`server is not connect with ${process.env.PORT} port`)
}
console.log(`server is  connected to ${process.env.PORT} port`)
})


