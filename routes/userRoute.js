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
  "/manage-user",
  middlewareController.verifyTokenAdmin,
  userController.getListUsers
);
router.post(
  "/manage-user/create",
  middlewareController.verifyTokenAdmin,
  userController.createUser
);
router.get(
  "/:id",
  middlewareController.verifyTokenOwnerAndAdmin,
  userController.getUser
);
router.patch(
  "/:id",
  middlewareController.verifyTokenOwnerAndAdmin,
  userController.updateUser
);
router.delete(
  "/:id",
  middlewareController.verifyTokenOwnerAndAdmin,
  userController.deleteUsers
);

module.exports = router;
