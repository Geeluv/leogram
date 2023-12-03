const express = require("express");
const router = express.Router();
const multer = require("multer");
const profileController = require("../controllers/profileController");
const uploadImage = multer({ dest: './uploads/' });

router.post("/edit/:id", uploadImage.fields([{ name: "profile_photo", maxCount: 1 }, { name: "profile_banner", maxCount: 1 }]), profileController.editProfile);
router.get("/profile/:id", profileController.fetchProfile);

module.exports = router;