const express = require("express");
const router = express.Router();
const postController = require("../controller/post_controller.js");
const postlikesController = require("../controller/postlikes_controller.js");
const postCommentsController = require("../controller/postcomments_controller.js");
const ImageUploader = require("../utils/imageUploader/imageUploader.js");
const AuthHandler = require("../utils/authHandler/authHandler.js")

router.post("/", AuthHandler, postController.create);
router.post("/list", postController.list);
router.post("/image", AuthHandler, ImageUploader.single('image'), postController.uploadImage);
router.post("/:id/like", AuthHandler, postlikesController.toggle);
router.get("/:id/likes", postlikesController.getPostLikes);
router.put("/:postId/comment/:commentId", AuthHandler, postCommentsController.update);
router.delete("/:postId/comment/:commentId", AuthHandler, postCommentsController.deleteById);
router.get("/:postId/comment/:commentId", postCommentsController.findById);
router.post("/:id/comment", AuthHandler, postCommentsController.create);
router.get("/:id/comments", postCommentsController.getComments);
router.get("/:id", postController.findById);
router.delete("/:id", AuthHandler, postController.deleteById);

module.exports = router;