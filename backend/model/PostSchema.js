const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        minlength: 1,
        maxlength: [2500, "Post cannot exceed the maximum of 2500 characters"],
        required: true
    },
    image: {
        type: String
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [String],
    comment_count: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);