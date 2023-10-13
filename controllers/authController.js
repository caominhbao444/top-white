const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpStatusCode = require("../Exceptions/HttpStatusCode.js");
const Exception = require("../Exceptions/Exception");

let refreshTokens = [];
const authController = {
  //[POST] /users/signup
  signUp: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { email, password, fullName, phoneNumber, address } = req.body;
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
  //GENERATE ACCESS_TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "2d",
      }
    );
  },
  //GENERATE REFRESH_TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "365d",
      }
    );
  },
  // //[POST] /users/login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "Email or password not invalid" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "Email or password not invalid" });
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        const { password, ...other } = user._doc;
        res.status(HttpStatusCode.OK).json({ user: other, accessToken });
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) res.status(401).json("You are not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        res.status(500).json(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  logout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );

    res.status(200).json("Log out!");
  },
};

module.exports = authController;
