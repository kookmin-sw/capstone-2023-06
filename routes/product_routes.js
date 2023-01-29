const express = require("express");
var router = express.Router();
var productController = require("../controller/product_controller.js");

router.get("/product/:id", productController.findById);

router.post("/product", productController.create);

module.exports = router;

