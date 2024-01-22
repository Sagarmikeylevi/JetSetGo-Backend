const { razorpayInstance } = require("..");
const crypto = require("crypto");
require("dotenv").config();
const Payment = require("../models/Payment");

const TIMEOUT = 3000; // 3 seconds

module.exports.createOrder = async (req, res) => {
  let { totalAmmount } = req.body;
  totalAmmount = Number(totalAmmount * 100);

  const options = {
    amount: totalAmmount,
    currency: "INR",
  };

  // Wrap the creation of the order in a setTimeout
  setTimeout(async () => {
    const order = await razorpayInstance.orders.create(options);

    // console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  }, TIMEOUT);
};

module.exports.paymentVarification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRECT);

  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  let generatedSignature = hmac.digest("hex");

  let isSignatureValid = generatedSignature === razorpay_signature;

  // Wrap the payment verification logic in a setTimeout
  setTimeout(async () => {
    if (isSignatureValid) {
      await Payment.create({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });
      res.redirect(
        `http://localhost:5173/paymentsuccess?paymentId=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
        message: "Signature verification failed",
      });
    }
  }, TIMEOUT);
};

module.exports.getRazorpayAPIKEY = async (req, res) => {
  // Wrap the response in a setTimeout
  setTimeout(() => {
    res.status(200).json({
      apiKey: process.env.RAZORPAY_API_KEY,
    });
  }, TIMEOUT);
};
