const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Top White");
});
router.post("/dangsanpham", (req, res) => {
  const sanpham = {
    productID: req.body.productID,
  };
  res.status(201).json({ sanpham: sanpham });
});
router.get("/:id", (req, res) => {});
router.patch("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
