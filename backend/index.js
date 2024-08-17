const express = require("express");
const {
    connection
} = require("./config/connection");
const {
    productRouter
} = require("./routerLinks/product.route");
const { UserRouter } = require("./routerLinks/userroute");
const { Authentication } = require("./middlwere/Authentication");
const { Forgetpassrouter } = require("./routerLinks/Forgetpassword");
const { Cartrouter } = require("./routerLinks/Cartrouter");
const { Addressroute } = require("./routerLinks/address.route");
const cors = require("cors");
const { OrderRoute } = require("./routerLinks/order.route");


require("dotenv").config();
const app = express();
app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json());
app.use("/productsapi", productRouter)
app.use("/user", UserRouter)
app.use('/cart',Authentication,Cartrouter)
app.use('/pass',Forgetpassrouter)
app.use('/address',Authentication,Addressroute)
app.use('/order',Authentication,OrderRoute)



app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("connection")
    } catch (err) {
        console.log(`server is not connect with ${process.env.PORT} port`)
    }
    console.log(`server is  connected to ${process.env.PORT} port`)
})