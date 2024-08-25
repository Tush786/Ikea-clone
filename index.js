const express = require("express");
const { connection } = require("./backend/config/connection");
const { productRouter } = require("./backend/routerLinks/product.route");
const { UserRouter } = require("./backend/routerLinks/userroute");
const { Authentication } = require("./backend/middlwere/Authentication");
const { Forgetpassrouter } = require("./backend/routerLinks/Forgetpassword");
const { Cartrouter } = require("./backend/routerLinks/Cartrouter");
const { Addressroute } = require("./backend/routerLinks/address.route");
const cors = require("cors");
const { OrderRoute } = require("./backend/routerLinks/order.route");
const { OrderConfirm } = require("./backend/routerLinks/orderConfirm");

require("dotenv").config();

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

// Registering routes
app.use("/productsapi", productRouter);
app.use("/user", UserRouter);
app.use('/cart', Authentication, Cartrouter);
app.use('/pass', Forgetpassrouter);
app.use('/address', Authentication, Addressroute);
app.use('/order', Authentication, OrderRoute);
app.use('/orderConfirm', OrderConfirm);

// Setting up the server port
const PORT = process.env.PORT || 9111;

app.listen(PORT, async () => {
    try {
        console.log("Database connection successful");
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
    console.log(`Server is connected to port ${PORT}`);
});
