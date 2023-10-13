const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", Category);
