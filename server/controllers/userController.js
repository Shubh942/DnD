const Cart = require("./../models/cartModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const nodemailer = require("nodemailer");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Cart.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  const doc = await Cart.create(req.body.user);
  // console.log("--------------------------------------");
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getData = catchAsync(async (req, res, next) => {
  //   console.log(req.body.data);
  const data = await JSON.parse(req.body.data);
  // console.log(data);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM,
      pass: process.env.PASS,
    },
  });
  var mailoptions = {
    from: process.env.FROM,
    to: "info@redpositive.in",
    subject: "Sucessfully Found users",
    text: `${JSON.stringify(data)}`,
  };
  await transporter.sendMail(mailoptions, (err, result) => {
    if (err) {
      // console.log(err);
    } else {
      console.log("Email send: " + result.response);
    }
  });

  res.status(201).json({
    status: "success",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // console.log(req.body.hobbies);

  const doc = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  // console.log(req.params.id);
  const doc = await Cart.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
