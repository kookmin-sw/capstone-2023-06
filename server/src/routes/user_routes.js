const express = require("express");
const passport = require("passport");
var router = express.Router();
var userController = require("../controller/user_controller.js");

router.post("/sign-up", userController.userSignUp);
router.post("/login", passport.authenticate('local'), userController.login);
router.get("/auto-login", userController.autologin);
router.get("/logout", userController.logout);

router.get("/:email", userController.findByEmail);

module.exports = router;

