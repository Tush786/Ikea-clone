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

// Setting up the server port
const PORT = process.env.PORT || 9111;

app.listen(PORT, async () => {
    try {
        // Ensure your connection function is properly set up
        await connection; // if connection is a promise, otherwise remove `await`
        console.log("Database connection successful");
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
    console.log(`Server is connected to port ${PORT}`);
});
