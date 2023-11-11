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

router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  flightController.updateFlight
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  flightController.deleteFlight
);

module.exports = router;
