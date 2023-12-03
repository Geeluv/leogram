const User = require("../../model/UserSchema");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");

exports.fetchAllUsers = asyncErrorHandler(async (req, res) => {
    const allUsers = await User.find().select({ username: 1, image: 1, bio: 1 });
    res.status(200).json({ allUsers: allUsers, user: req.decoded.following });
});

exports.followUser = asyncErrorHandler(async (req, res, next) => {
    const { userId } = req.body;
    if (userId !== req.decoded._id) {
        const isFollowing = await User.findOne({ _id: userId, followers: req.decoded._id });
        if (!isFollowing) {
            await User.findOneAndUpdate({ _id: userId }, { $push: { followers: req.decoded._id } });
            await User.findOneAndUpdate({ _id: req.decoded._id }, { $push: { following: userId } }, { new: true, runValidators: true });
            res.status(200).json({ message: "Follow" })
        } else {
            await User.findOneAndUpdate({ _id: userId }, { $pull: { followers: req.decoded._id } });
            await User.findOneAndUpdate({ _id: req.decoded._id }, { $pull: { following: userId } }, { new: true, runValidators: true });
            res.status(200).json({ message: "Unfollow" })
        }
    }

});