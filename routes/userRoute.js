const express = require("express");
const {
  signUp,
  signIn,
  getUserById,
  updateUserById,
  getListUsers,
  createUsers,
  deleteUsers,
} = require("../controllers/userController");
const { body, validationResult } = require("express-validator");
const router = express.Router();

/////////////////////USER///////////////////////////////////////////
router.post("/signup", signUp);
router.post(
  "/signin",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  signIn
);
router.get("/:id", getUserById);
//User và admin có thể cập nhật thông tin
router.patch("/:id", updateUserById);
/////////////////////ADMIN///////////////////////////////////////////
router.get("/manage-user/", getListUsers);
router.post("/manage-user/create", createUsers);

router.delete("/manage-user/:id", deleteUsers);

module.exports = router;
