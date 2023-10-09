const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpStatusCode = require("../Exceptions/HttpStatusCode.js");
const Exception = require("../Exceptions/Exception");

const userController = {
  //[POST] /users/signup
  signUp: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { email, password, fullName, phoneNumber, address, role } =
        req.body;
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "User already exits" });
      }
      try {
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
        res.status(500).send({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
  },
  // //[POST] /users/login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "Email or password not invalid" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "Email or password not invalid" });
      }
      if (user && validPassword) {
        const accessToken = jwt.sign(
          { id: user._id, email: user.email, role: user.role },
          process.env.JWT_ACCESS_KEY,
          {
            expiresIn: "1h",
          }
        );

        const { password, ...other } = user._doc;
        res.status(HttpStatusCode.OK).json({ user: other, accessToken });
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  /////[GET] /users/manage-user/
  getListUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(HttpStatusCode.OK).json(user);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  // //[DELETE] /users/manage-user/:id
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

//[POST] /users/signup
// const signUp = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     const { email, password, name, phone } = req.body;

//     const existingUser = await User.findOne({ email }).exec();
//     if (existingUser) {
//       return res
//         .status(HttpStatusCode.BAD_REQUEST)
//         .json({ message: "User already exits" });
//     }
//     try {
//       const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
//       const hashPassword = await bcrypt.hash(password, salt);
//       //insert to db
//       const newUser = await User.create({
//         email,
//         password: hashPassword,
//         name,
//         phone,
//       });
//       res.status(201).send({
//         message: "Create successfully",
//         newUser,
//       });
//     } catch (error) {
//       res.status(500).send({
//         message: "Internal Server Error",
//         error: error.message,
//       });
//     }
//   } else {
//     res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
//   }
// };
// //[POST] /users/signin
// async function signIn(req, res) {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res
//       .status(HttpStatusCode.BAD_REQUEST)
//       .json({ errors: errors.array() });
//   }
//   const { email, password } = req.body;
//   res.status(HttpStatusCode.OK).json({ message: "Login successful" });
// }

// //[GET] /users/:id
// async function getUserById(req, res) {
//   res.status(HttpStatusCode.OK).json({ message: "Thong tin nguoi dung" });
// }

// //[PATCH] /users/:id
// async function updateUserById(req, res) {
//   res
//     .status(HttpStatusCode.OK)
//     .json({ message: "Cap nhat thong tin nguoi dung" });
// }

// //[GET] /users/manage-user/
// async function getListUsers(req, res) {
//   res
//     .status(HttpStatusCode.OK)
//     .json({ message: "Danh sach thong tin nguoi dung" });
// }

// //[POST] /users/manage-user/create
// async function createUsers(req, res) {
//   res.status(HttpStatusCode.OK).json({ message: "Tao nguoi dung" });
// }

// module.exports = {
//   signUp,
//   signIn,
//   getUserById,
//   updateUserById,
//   getListUsers,
//   createUsers,
//   deleteUsers,
// };
