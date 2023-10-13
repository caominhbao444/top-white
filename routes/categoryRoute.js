const express = require("express");
const userController = require("../controllers/userController");
const { body, validationResult } = require("express-validator");
const middlewareController = require("../middleware/middlewareController");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.get("/", categoryController.getListCategories);
router.post(
  "/create",
  middlewareController.verifyTokenAdmin,
  categoryController.createCategory
);

// router.delete(
//   "/manage-user/:id",
//   middlewareController.verifyTokenAndAdmin,
//   userController.deleteUsers
// );

module.exports = router;
