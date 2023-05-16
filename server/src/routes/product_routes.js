const express = require("express");
const router = express.Router();
const productController = require("../controller/product_controller.js");
const productlikesController = require("../controller/productlikes_controller.js");
const productcommentsController = require("../controller/productcomments_controller.js");
const ImageUploader = require("../utils/imageUploader/imageUploader.js");
const BrandAuthHandler = require("../utils/authHandler/brandAuthHandler.js");
const AuthHandler = require("../utils/authHandler/authHandler.js");

router.post("/", BrandAuthHandler, productController.create);
router.post("/:id/like", AuthHandler, productlikesController.toggle);
router.get("/:id/likes", productlikesController.getProductLikes);
router.post("/search", productController.search);
router.post("/image", BrandAuthHandler, ImageUploader.single("image"), productController.uploadProductsImage);
router.post("/list", productController.getProducts);
router.get("/:productId/comment/:commentId", productcommentsController.findById);
router.delete("/:productId/comment/:commentId", AuthHandler, productcommentsController.delete);
router.put("/:productId/comment/:commentId", AuthHandler, productcommentsController.update);
router.post("/:id/comment", AuthHandler, productcommentsController.create);
router.get("/:id/comments", productcommentsController.getComments);
router.get("/:id", productController.findById);

// TODO: 1. 유저가 쓴 스타일링
// TODO: 2. 유저 추천 스케줄러
// TODO: 3. 유저 추천 API
// TODO: 4. 라이크 순으로 조회


module.exports = router;

