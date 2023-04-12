const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controller/user_controller.js");
const ImageUploader = require("../utils/imageUploader/imageUploader.js");

router.post("/sign-up", userController.userSignUp);
router.post("/login", passport.authenticate('local'), userController.login);
router.get("/auto-login", userController.autologin);
router.get("/logout", userController.logout);
router.get("/id/:id", userController.findById)
router.get("/email/:email", userController.findByEmail);
router.post("/profile", ImageUploader.single("image"), userController.uploadProfile);
router.delete("/", userController.deleteUser);




module.exports = router;

