const asyncErrorHandler = require("../utils/asyncErrorHandler");
const User = require("../model/UserSchema");
const fs = require("fs");

exports.editProfile = asyncErrorHandler(async (req, res, next) => {
    const { username, bio } = req.body;
    let imagePath;
    let bannerPath;
    let oldImagePath;
    let oldBannerPath;
    let profilePhoto;
    let bannerImage;

    if ((req.files).profile_photo || (req.files).profile_banner) {
        let imageFiles = req.files;
        if (imageFiles.profile_photo) {
            profilePhoto = imageFiles.profile_photo;
            const { originalname, path } = profilePhoto[0];
            const splitName = originalname.split(".");
            const ext = splitName[splitName.length - 1]
            imagePath = path + `.${ext}`;
            oldImagePath = path;

        }
        if (imageFiles.profile_banner) {
            bannerImage = imageFiles.profile_banner;
            const { originalname, path } = bannerImage[0];
            const splitName = originalname.split(".");
            const ext = splitName[splitName.length - 1]
            bannerPath = path + `.${ext}`;
            oldBannerPath = path;

        }
    }
    const docs1 = await User.findOne({ _id: req.decoded._id });
    const docs = await User.findByIdAndUpdate({ _id: req.decoded._id }, {
        username: username ? username : req.decoded.username,
        bio: bio ? bio : docs1.bio,
        image: imagePath && imagePath,
        banner_image: bannerPath && bannerPath
    }, { new: true, runValidators: true });
    if (docs) {
        console.log(docs)
        // fs.renameSync(oldImagePath, imagePath);
        // fs.renameSync(oldBannerPath, bannerPath);
    }

    res.status(200).json({ message: "Profile updated!", docs: docs })
})

exports.fetchProfile = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const docs = await User.findOne({ _id: id });
    res.status(200).json(docs)
})