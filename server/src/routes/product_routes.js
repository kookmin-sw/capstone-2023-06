const express = require("express");
var router = express.Router();
var productController = require("../controller/product_controller.js");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/:id", productController.findById);

router.post("/", upload.array("imgs"), productController.create);

module.exports = router;

