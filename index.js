const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("./config/mongoose");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-authentication");
const Razorpay = require("razorpay");
const cors = require("cors");

module.exports.razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,

  key_secret: process.env.RAZORPAY_API_SECRECT,
});

// Use CORS middleware before defining routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // This is important for handling cookies and credentials
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
