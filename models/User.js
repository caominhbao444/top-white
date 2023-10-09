const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    orderCount: {
      type: Number,
      default: 0,
    },
    acceptedCount: {
      type: Number,
      default: 0,
    },
    declinedCount: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
