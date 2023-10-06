const express = require("express");
const router = express.Router();

/////////////////////USER///////////////////////////////////////////
router.get("/", (req, res) => {
  res.send("Danh sach tat ca order cua user dang xu ly");
});
router.get("/history", (req, res) => {
  res.send("Danh sach tat ca order cua user da xu ly");
});
router.post("/buy", (req, res) => {
  res.send("Mua san pham");
});
router.get("/:id", (req, res) => {
  res.send("Lay thong tin chi tiet cua tung order");
});
router.patch("/:id", (req, res) => {
  res.send("Cap nhat thong tin chi tiet cua tung order");
});
router.delete("/:id", (req, res) => {
  res.send("Xoa order");
});
/////////////////////ADMIN///////////////////////////////////////////
// router.get("/manage-orders/", (req, res) => {
//   res.send("Danh sach cac order dang xu ly");
// });
router.get("/manage-orders/history", (req, res) => {
  res.send("Lich su cac order da xu ly");
});

// router.put("/manage-orders/:id", (req, res) => {
//   res.send("Cap nhat trang thai order");
// });
module.exports = router;
