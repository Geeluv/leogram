const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");
const Post = require("../model/PostSchema");
const fs = require("fs");
const path = require("path");
const User = require("../model/UserSchema");

exports.createPost = asyncErrorHandler(async (req, res, next) => {
    const { content } = req.body;
    let newPath;
    if (req.file) {
        const { originalname, path } = req.file;
        const splitName = originalname.split(".");
        const ext = splitName[splitName.length - 1];
        newPath = path + `.${ext}`;
        fs.renameSync(path, newPath);
    }
    await Post.create({
        content,
        like_count: 0,
        comment_count: 0,
        image: newPath && newPath,
        author: req.decoded.id,
    });
    res.status(200).json({ message: "Your post has been uploaded" });
})

exports.deletePost = asyncErrorHandler(async (req, res, next) => {
    const { postId } = req.body;
    const docs = await Post.findOne(
        { _id: postId, author: req.decoded._id }
    );

    if (docs.image) {
        const splitPath = (docs.image).split("uploads\\");
        console.log(splitPath)
        const directory = fs.readdirSync(path.join(__dirname, "..", "uploads"))
        directory.forEach(file => {
            if (file === splitPath[1]) {
                fs.unlink(path.join(__dirname, "..", "uploads", splitPath[1]), (err => {
                    if (err) next(err);
                    res.status(200).json({ message: "Image deleted" });
                }
                ))
            }
        })
    }

    const post = await Post.findOneAndDelete(
        { _id: postId, author: req.decoded._id },
        { new: true, runValidators: true }
    )

    if (!post) {
        const deleteErr = new CustomError("You are not authorized to delete this post", 401);
        next(deleteErr)
    } else {
        res.status(200).json({ message: "Post deleted!", docs: post });
    }
})

exports.likePost = asyncErrorHandler(async (req, res, next) => {
    const { postId } = req.body;
    const username = req.decoded.username.toLowerCase();
    const isLiked = await Post.findOne({ _id: postId, likes: username });
    if (isLiked) {
        const post = await Post.findOneAndUpdate(
            { _id: postId },
            { $pull: { likes: username } },
            { new: true, runValidators: true });
        res.status(200).json({ message: false, post: post })
    } else {
        const post = await Post.findOneAndUpdate(
            { _id: postId },
            { $push: { likes: username } },
            { new: true, runValidators: true });
        res.status(200).json({ message: true, post: post })
    }

})

exports.fetchAllPosts = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find({ followers: req.decoded._id })
    users.push(req.decoded._id)
    const allPosts = await Post.find({ author: { $in: users } })
        .populate("author", ["username", "_id", "image"])
        .sort({ createdAt: -1 });
    res.status(200).json(allPosts);
})


