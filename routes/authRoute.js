const express = require("express");
const authController = require("../controllers/authController");
const middlewareController = require("../middleware/middlewareController");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", middlewareController.verifyToken, authController.logout);
router.post("/refresh", authController.requestRefreshToken);
module.exports = router;
