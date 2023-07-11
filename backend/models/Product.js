const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String, required: true },
    categories: { type: Array },
    subcat: { type: Array },
    priceKg: { type: Number },
    priceUnit: { type: Number },
    priceCase: { type: Number },
    unitsInKg: { type: String },
    kgInUnit: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
