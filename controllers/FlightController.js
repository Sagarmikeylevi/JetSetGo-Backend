const Flight = require("../models/Flight");

// add flight
module.exports.addFlight = async (req, res) => {
  try {
    if (req.user && req.user.role === "admin") {
      const {
        departureDestination,
        arrivalDestination,
        datesOfDeparture,
        timeOfDeparture,
        timeOfArrival,
        airline,
        seatsAvailable,
      } = req.body;

      const existingFlight = await Flight.findOne({
        timeOfDeparture: timeOfDeparture,
        airline: airline,
        departureDestination: departureDestination,
        arrivalDestination: arrivalDestination,
      });

      if (existingFlight) {
        return res
          .status(409)
          .json({ error: "A flight with the same details already exists." });
      }

      const newFlight = new Flight({
        departureDestination,
        arrivalDestination,
        datesOfDeparture,
        timeOfDeparture,
        timeOfArrival,
        airline,
        seatsAvailable,
      });

      // Save the new flight to the database
      const savedFlight = await newFlight.save();

      res.status(201).json(savedFlight);
    } else {
      // If the user is not an admin, return a forbidden (403) response
      res.status(403).json({ error: "Permission denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add a new flight" });
  }
};

// get flight
module.exports.fetchFlights = async (req, res) => {
  try {
    const flights = await Flight.find({}).sort({ createdAt: -1 });

    res.status(200).json({ flights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};

// update flight data
module.exports.updateFlight = async (req, res) => {
  try {
    if (req.user && req.user.role === "admin") {
      const flightId = req.params.id; // Assuming the flight ID is passed as a route parameter

      // Check if the flight with the given ID exists
      const existingFlight = await Flight.findById(flightId);

      if (!existingFlight) {
        return res.status(404).json({ error: "Flight not found" });
      }

      // Update the flight data with the new values from the request body
      const {
        departureDestination,
        arrivalDestination,
        datesOfDeparture,
        timeOfDeparture,
        timeOfArrival,
        airline,
        seatsAvailable,
      } = req.body;

      existingFlight.departureDestination = departureDestination;
      existingFlight.arrivalDestination = arrivalDestination;
      existingFlight.datesOfDeparture = datesOfDeparture;
      existingFlight.timeOfDeparture = timeOfDeparture;
      existingFlight.timeOfArrival = timeOfArrival;
      existingFlight.airline = airline;
      existingFlight.seatsAvailable = seatsAvailable;

      // Save the updated flight to the database
      const updatedFlight = await existingFlight.save();

      res.status(200).json(updatedFlight);
    } else {
      // If the user is not an admin, return a forbidden (403) response
      console.log(req.user);
      res.status(403).json({ error: "Permission denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update flight" });
  }
};

module.exports.deleteFlight = async (req, res) => {
  try {
    if (req.user && req.user.role === "admin") {
      const flightId = req.params.id;

      const deletion = await Flight.deleteOne({ _id: flightId });

      if (deletion.deletedCount === 0) {
        return res.status(404).json({ error: "Flight not found" });
      }

      res.status(200).json({ message: "Flight deleted successfully" });
    } else {
      res.status(403).json({ error: "Permission denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete flight" });
  }
};
