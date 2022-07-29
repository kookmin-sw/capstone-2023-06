const express = require("express");
var router = express.Router();
var userController = require("../controller/user_controller.js");

router.get("/", userController.findAll);
router.get("/:email", userController.findByEmail);

module.exports = router;