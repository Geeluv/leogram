const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        minlength: 1,
        required: true
    },
    parent_id: {
        type: String,
        required: true
    },
    like_count: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);