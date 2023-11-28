const express = require("express");
const router = express.Router();
const multer = require("multer");
const profileController = require("../controllers/profileController");
const uploadImage = multer({ dest: './uploads/' });

router.post("/edit-profile", uploadImage.fields([{ name: "profile_photo", maxCount: 1 }, { name: "profile_banner", maxCount: 1 }]), profileController.editProfile);
router.get("/profile", profileController.fetchProfile);

module.exports = router;