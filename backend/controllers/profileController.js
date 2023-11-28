const asyncErrorHandler = require("../utils/asyncErrorHandler");
const User = require("../model/UserSchema");
const fs = require("fs");

exports.editProfile = asyncErrorHandler(async (req, res, next) => {
    // console.log("before edit");

    const { username } = req.body;
    let imagePath;
    let bannerPath;
    let imageFiles = req.files;
    let profilePhoto = imageFiles.profile_photo;
    let bannerImage = imageFiles.profile_banner;

    if (req.files) {
        const imageName = profilePhoto[0].fieldname;
        const bannerName = bannerImage[0].fieldname;
        if (imageName) {
            const { originalname, path } = profilePhoto[0];
            const splitName = originalname.split(".");
            const ext = splitName[splitName.length - 1]
            imagePath = path + `.${ext}`;
            fs.renameSync(path, imagePath);
        }
        if (bannerName) {
            const { originalname, path } = bannerImage[0];
            const splitName = originalname.split(".");
            const ext = splitName[splitName.length - 1]
            bannerPath = path + `.${ext}`;
            fs.renameSync(path, bannerPath);
        }
    }

    const docs = await User.findByIdAndUpdate({ _id: req.decoded._id }, {
        username: username && username,
        image: imagePath && imagePath,
        banner_image: bannerPath && bannerPath
    }, { new: true, runValidators: true });
    res.status(200).json({ message: "Profile updated!", docs: docs })
})

exports.fetchProfile = asyncErrorHandler(async (req, res, next) => {
    const id = req.decoded._id;
    const docs = await User.findOne({ _id: id });
    res.status(200).json(docs)
})