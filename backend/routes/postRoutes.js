const express = require("express");
const router = express.Router();
const multer = require("multer");
const postController = require("../controllers/postController/postController");
const uploadImage = multer({ dest: './uploads/' });

router.post("/create-post", uploadImage.single("postimage"), postController.createPost);
router.get("/posts", postController.fetchAllPosts);
router.delete("/post/delete", postController.deletePost);
router.post("/post/like", postController.likePost);

module.exports = router;