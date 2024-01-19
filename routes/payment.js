const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/PaymentController");

router.post("/createOrder", paymentController.createOrder);
router.post("/paymentVarification", paymentController.paymentVarification);
router.get("/getAPI_KEY", paymentController.getRazorpayAPIKEY);

module.exports = router;
