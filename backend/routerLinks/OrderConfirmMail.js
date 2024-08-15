const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { Order_model } = require("../model/ordermodel");
const { UserModel } = require("../model/usermodel");

dotenv.config();

const PaymentRouter = express.Router();


module.exports = {
  PaymentRouter,
};
