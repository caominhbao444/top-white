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
      validate: {
        validator: (value) => isEmail,
        message: "Email validation failed",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isStrongPassword,
        message: "Password not strong",
      },
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
