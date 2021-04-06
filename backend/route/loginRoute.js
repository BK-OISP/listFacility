const express = require("express");

const loginController = require("../controller/login");

const router = express.Router();

router.post("/googlelogin", loginController.googleLogin);
router.post("/refreshtoken", loginController.refreshToken);

module.exports = router;
