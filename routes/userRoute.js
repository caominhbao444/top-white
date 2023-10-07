const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

/////////////////////USER///////////////////////////////////////////
router.post("/signup", (req, res) => {
  res.send("Dang ky");
});
router.post(
  "/signin",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    res.send("Dang nhap");
  }
);
router.get("/information", (req, res) => {
  res.send("Thong tin nguoi dung");
});
//User và admin có thể cập nhật thông tin
router.patch("/:id", (req, res) => {
  res.send("Cap nhat thong tin nguoi dung");
});
/////////////////////ADMIN///////////////////////////////////////////
router.get("/manage-user/", (req, res) => {
  res.send("Danh sach tat ca nguoi dung");
});
router.post("/manage-user/create", (req, res) => {
  res.send("Tao nguoi dung");
});

router.delete("/manage-user/:id", (req, res) => {
  res.send("Xoa nguoi dung " + req.params.id);
});

module.exports = router;
