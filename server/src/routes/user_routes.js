const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controller/user_controller.js");
const ImageUploader = require("../utils/imageUploader/imageUploader.js");
const followerController = require("../controller/follower_controller.js");
const AuthHandler = require("../utils/authHandler/authHandler.js");

router.post("/brand/sign-up", userController.brandUserSignUp);
router.post("/sign-up", userController.userSignUp);
router.post("/login", passport.authenticate('local'), userController.login);
router.get("/auto-login", userController.autologin);
router.get("/logout", userController.logout);
router.post("/:id/follow", AuthHandler, followerController.toggle);
router.get("/:id/follow", AuthHandler, followerController.isFollow);
router.get("/:id/followers", followerController.followers);
router.get("/follow", AuthHandler, followerController.myFollower);
router.get("/id/:id", userController.findById)
router.get("/email/:email", userController.findByEmail);
router.post("/profile", AuthHandler, ImageUploader.single("image"), userController.uploadProfile);
router.delete("/", userController.deleteUser);

module.exports = router;

