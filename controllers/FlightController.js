const Flight = require("../models/Flight");

// add flight
module.exports.addFlight = async (req, res) => {
  try {
    console.log(req.body);
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

      const existingFlight = await Flight.find({
        departureDestination: departureDestination,
        arrivalDestination: arrivalDestination,
        timeOfDeparture: timeOfDeparture,
        airline: airline,
      });

      if (existingFlight) {
        res
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
    const flights = await Flight.find({});

    if (flights.length === 0) {
      return res.status(404).json({ error: "No flights found" });
    }

    res.status(200).json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};
