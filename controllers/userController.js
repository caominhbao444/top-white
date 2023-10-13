const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpStatusCode = require("../Exceptions/HttpStatusCode.js");
const Exception = require("../Exceptions/Exception");

const userController = {
  /////[GET] /users/manage-user/
  getListUsers: async (req, res) => {
    try {
      const role = req.user.role;
      if (role !== "admin") {
        return res.status(403).json("You do not have permission to access!");
      }
      const user = await User.find();
      res.status(HttpStatusCode.OK).json(user);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  //[POST] /users/manage-user/create
  createUser: async (req, res) => {
    try {
      const { email, password, fullName, phoneNumber, address, role } =
        req.body;
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "User already exits" });
      }
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      const hashPassword = await bcrypt.hash(password, salt);
      //insert to db
      const newUser = await User.create({
        email,
        password: hashPassword,
        fullName,
        phoneNumber,
        address,
        role,
      });
      res.status(201).send({
        message: "Create successfully",
        newUser,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  // //[GET] /users/:id
  getUser: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
      const { password, ...details } = user._doc;
      res.status(HttpStatusCode.OK).json(details);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  // //[PATCH] /users/:id
  updateUser: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          fullName: req.body.fullName,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
        }
      );
      res.status(HttpStatusCode.OK).json("User updated successfully");
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  // //[DELETE] /users/:id
  deleteUsers: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res
        .status(HttpStatusCode.OK)
        .json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(HttpStatusCode.OK).json(error);
    }
  },
};

module.exports = userController;
