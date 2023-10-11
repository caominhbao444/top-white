const express = require("express");
const userController = require("../controllers/userController");
const { body, validationResult } = require("express-validator");
const middlewareController = require("../middleware/middlewareController");
const router = express.Router();

/////////////////////USER///////////////////////////////////////////
// router.post("/signup", body("email").isEmail(), userController.signUp);
// router.post("/login", userController.login);
// router.get("/:id", getUserById);
// //User và admin có thể cập nhật thông tin
// router.patch("/:id", updateUserById);
// /////////////////////ADMIN///////////////////////////////////////////
router.get(
  "/manage-user/",
  middlewareController.verifyToken,
  userController.getListUsers
);
// router.post("/manage-user/create", createUsers);

router.delete(
  "/manage-user/:id",
  middlewareController.verifyTokenAndAdmin,
  userController.deleteUsers
);

module.exports = router;
