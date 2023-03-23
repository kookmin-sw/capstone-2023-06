const express = require("express");
const router = express.Router();
const postController = require("../controller/post_controller.js");

router.post("/", postController.create);
router.get("/:id", postController.findById);
router.delete("/:id", postController.deleteById);

module.exports = router;