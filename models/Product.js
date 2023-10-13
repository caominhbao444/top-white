const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    orderCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: { type: String, slug: "name", unique: true },
    role: {
      type: String,
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
