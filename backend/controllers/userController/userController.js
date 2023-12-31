const User = require("../../model/UserSchema");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const CustomError = require("../../utils/CustomError");
const sendEmail = require("../../utils/emailSender");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

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
            res.status(200).json({ message: "Follow" });
        } else {
            await User.findOneAndUpdate({ _id: userId }, { $pull: { followers: req.decoded._id } });
            await User.findOneAndUpdate({ _id: req.decoded._id }, { $pull: { following: userId } }, { new: true, runValidators: true });
            res.status(200).json({ message: "Unfollow" });
        }
    }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        const errPass = new CustomError("We couldn't find the user with the given email", 404);
        next(errPass);
        return
    }
    const resetToken = await user.passwordResetToken();
    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/leogram/users/reset-password/${resetToken}`;
    const message = `You are receiving this mail because you requested for a password reset.\n Click the link below to change your password \n\n ${resetUrl}\n Your link is only valid for 10 minutes`;
    try {
        await sendEmail({
            email: user.email,
            subject: "Password reset request",
            message: message
        })
        res.status(200).json({
            status: "success",
            message: "Check your email! Your reset link has been sent"
        })
    } catch (err) {
        user.pwdResetToken = undefined
        user.pwdResetTokenExp = undefined
        console.log(err)
        return next(new CustomError("Sorry! An error occured while sending password reset email", 500))
    }
})

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    const token = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ pwdResetToken: token, pwdResetTokenExp: { $gt: Date.now() } }).select("+password");
    if (!user) {
        const err = new CustomError("Token is invalid or expired!", 400);
        next(err);
    }
    console.log(user)
    console.log(req.body.password);
    const hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;
    user.pwdResetToken = undefined;
    user.pwdResetTokenExp = undefined;

    await user.save();
    res.status(200).json({
        status: "success",
        message: "New password saved! You can now login."
    })
})