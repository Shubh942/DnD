const mongoose = require("mongoose");
const validator = require("validator");

const addCartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    maxlength: 20,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide us your Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid Email"],
  },
  photo: {
    type: String,
    default:
      "http://res.cloudinary.com/df4t1zu7e/image/upload/v1678403577/i9refylv9btn7xrb69gd.jpg",
  },
  hobbies: [
    {
      type: String,
    },
  ],
});

const AddCart = mongoose.model("AddCart", addCartSchema);
module.exports = AddCart;
