const express = require("express");
const router = express.Router();
const { signin, signup, uploadImage } = require("../controller/auth");
const authenticated = require("../middleware/auth");

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/upload-image", authenticated, uploadImage);

module.exports = router;
