const express = require("express");
const router = express.Router();
const productController = require("../controller/product_controller.js");
const productlikesController = require("../controller/productlikes_controller.js");
const ImageUploader = require("../utils/imageUploader/imageUploader.js");
const BrandAuthHandler = require("../utils/authHandler/brandAuthHandler.js");
const AuthHandler = require("../utils/authHandler/authHandler.js");

router.post("/", BrandAuthHandler, productController.create);
router.post("/:id/like", AuthHandler, productlikesController.toggle);
router.get("/:id/likes", productlikesController.getProductLikes);
router.post("/image", BrandAuthHandler, ImageUploader.single("image"), productController.uploadProductsImage);
router.post("/list", productController.getProducts);
router.get("/:id", productController.findById);

module.exports = router;

