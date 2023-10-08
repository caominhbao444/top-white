const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const HttpStatusCode = require("../Exceptions/HttpStatusCode.js");
const Exception = require("../Exceptions/Exception");
//[POST] /users/signup
const signUp = async (req, res) => {
  const { email, password, name, phone } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(Exception.USER_ALREADY);
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashPassword = await bcrypt.hash(password, salt);
    //insert to db
    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
      phone,
    });
    res.status(201).send({
      message: "Create successfully",
      newUser,
    });
  } catch (error) {
    ////check errrors========================================================
    res.status(error);
  }
};
//[POST] /users/signin
async function signIn(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  res.status(HttpStatusCode.OK).json({ message: "Login successful" });
}

//[GET] /users/:id
async function getUserById(req, res) {
  res.status(HttpStatusCode.OK).json({ message: "Thong tin nguoi dung" });
}

//[PATCH] /users/:id
async function updateUserById(req, res) {
  res
    .status(HttpStatusCode.OK)
    .json({ message: "Cap nhat thong tin nguoi dung" });
}

//[GET] /users/manage-user/
async function getListUsers(req, res) {
  res
    .status(HttpStatusCode.OK)
    .json({ message: "Danh sach thong tin nguoi dung" });
}

//[POST] /users/manage-user/create
async function createUsers(req, res) {
  res.status(HttpStatusCode.OK).json({ message: "Tao nguoi dung" });
}

//[DELETE] /users/manage-user/:id
async function deleteUsers(req, res) {
  res.status(HttpStatusCode.OK).json({ message: "Xoa nguoi dung" });
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
