const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/comment", commentController.uploadComment);
router.get("/:id/comments", commentController.fetchAllComments);
router.delete("/comment/delete", commentController.deleteComment);

module.exports = router