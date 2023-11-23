const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");
const Post = require("../model/PostSchema");
const Comment = require("../model/CommentSchema");

exports.uploadComment = asyncErrorHandler(async (req, res, next) => {
    const { comment, postId } = req.body;
    const newComment = await Comment.create({
        author: req.decoded._id,
        content: comment,
        parent_id: postId,
    })
    await Post.findOneAndUpdate({ _id: postId }, { $push: { comment: newComment._id } })
    res.status(200).json({ message: "Your comment has been posted" })
})

exports.deleteComment = (asyncErrorHandler(async (req, res, next) => {
    const { commentId, parentId } = req.body;
    const docs = await Comment.deleteOne({ _id: commentId, author: req.decoded._id });
    if (docs.deletedCount > 0) {
        await Post.findOneAndUpdate({ _id: parentId }, { $pull: { comment: commentId } });
        res.status(200).json({ message: "Your comment has been deleted!" })
    } else {
        res.status(400).json({ message: "You are not the owner of this comment!" })
    }

}))

exports.fetchAllComments = (asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const docs = await Comment.find({ parent_id: id }).populate("author", ["username"]);
    res.status(200).json(docs);
}))

