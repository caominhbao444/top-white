const express = require("express");
const userController = require("../controllers/userController");
const { body, validationResult } = require("express-validator");
const router = express.Router();

/////////////////////USER///////////////////////////////////////////
router.post("/signup", body("email").isEmail(), userController.signUp);
router.post("/login", userController.login);
// router.get("/:id", getUserById);
// //User và admin có thể cập nhật thông tin
// router.patch("/:id", updateUserById);
// /////////////////////ADMIN///////////////////////////////////////////
router.get("/manage-user/", userController.getListUsers);
// router.post("/manage-user/create", createUsers);

router.delete("/manage-user/:id", userController.deleteUsers);

module.exports = router;
