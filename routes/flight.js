const express = require("express");
const router = express.Router();
const passport = require("passport");

const flightController = require("../controllers/FlightController");

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  flightController.addFlight
);

router.get("/getFlights", flightController.fetchFlights);

module.exports = router;
