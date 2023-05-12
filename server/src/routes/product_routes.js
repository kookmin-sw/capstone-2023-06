const express = require("express");
const router = express.Router();
const productController = require("../controller/product_controller.js");
const ImageUploader = require("../utils/imageUploader/imageUploader.js");
const BrandAuthHandler = require("../utils/authHandler/brandAuthHandler.js");

router.post("/", BrandAuthHandler, productController.create);
router.post("/image", BrandAuthHandler, ImageUploader.single("image"), productController.uploadProductsImage);
router.get("/:id", productController.findById);
module.exports = router;

