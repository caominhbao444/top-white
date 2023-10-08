const { body, validationResult } = require("express-validator");
//[POST] /users/signup
const signUp = async (req, res) => {
  const { email, password, name, phone } = req.body;
};
//[POST] /users/signin
async function signIn(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  res.status(202).json({ message: "Login successful" });
}

//[GET] /users/:id
async function getUserById(req, res) {
  res.send("Thong tin nguoi dung");
}

//[PATCH] /users/:id
async function updateUserById(req, res) {
  res.send("Cap nhat thong tin nguoi dung");
}

//[GET] /users/manage-user/
async function getListUsers(req, res) {
  res.send("Danh sach thong tin nguoi dung");
}

//[GET] /users/manage-user/create
async function createUsers(req, res) {
  res.send("Tao nguoi dung");
}

//[GET] /users/manage-user/:id
async function deleteUsers(req, res) {
  res.send("Xoa nguoi dung");
}

module.exports = {
  signUp,
  signIn,
  getUserById,
  updateUserById,
  getListUsers,
  createUsers,
  deleteUsers,
};
