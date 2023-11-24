const express = require("express");
const router = express.Router();
const passport = require("passport");

const passengerController = require("../controllers/PassengerController");

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  passengerController.addPassenger
);

router.get(
  "/getPasseger",
  passport.authenticate("jwt", { session: false }),
  passengerController.getPassenger
);

module.exports = router;
