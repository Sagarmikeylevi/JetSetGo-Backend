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
  "/getAllPassengers",
  passport.authenticate("jwt", { session: false }),
  passengerController.getAllPassengers
);

router.get(
  "/getPassenger/:id",
  passport.authenticate("jwt", { session: false }),
  passengerController.getPassengerById
);

router.put(
  "/conform/:id",
  passport.authenticate("jwt", { session: false }),
  passengerController.confirmPassenger
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  passengerController.deleteById
);

module.exports = router;
