const express = require("express");
const router = express.Router();
const passport = require("passport");

const paymentController = require("../controllers/PaymentController");

router.post(
  "/createOrder",
  passport.authenticate("jwt", { session: false }),
  paymentController.createOrder
);
router.post(
  "/paymentVarification",
  passport.authenticate("jwt", { session: false }),
  paymentController.paymentVarification
);
router.get(
  "/getAPI_KEY",
  passport.authenticate("jwt", { session: false }),
  paymentController.getRazorpayAPIKEY
);

module.exports = router;
