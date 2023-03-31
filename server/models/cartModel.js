const mongoose = require("mongoose");
const validator = require("validator");

const cartSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  id: {
    type: Number,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
