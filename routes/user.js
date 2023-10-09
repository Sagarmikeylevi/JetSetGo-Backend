const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/UserController");

router.post("/register", userController.register);
router.post("/login", userController.createSession);
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  userController.getUser
);

module.exports = router;
