const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(req.headers)
  if (!token) {
    res.status(400).send("Please Login");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.send({ message: "Please Login With Correct Crediential" });
      } else {
        const userId = decoded.userId;
        req.body.owner = userId;
        next();
      }
    });
  }
};

module.exports = { Authentication };
