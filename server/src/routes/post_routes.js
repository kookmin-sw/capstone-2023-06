const express = require("express");
const router = express.Router();
const postController = require("../controller/post_controller.js");
const ImageUploader = require("../utils/imageUploader/imageUploader.js");
const AuthHandler = require("../utils/authHandler/authHandler.js")

router.post("/", AuthHandler, postController.create);
router.post("/list", postController.list);
router.post("/image", AuthHandler, ImageUploader.single('image'), postController.uploadImage);
router.get("/:id", postController.findById);
router.delete("/:id", AuthHandler, postController.deleteById);

module.exports = router;