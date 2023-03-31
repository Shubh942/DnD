const express = require("express");

const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/getAllUser").get(userController.getAllUsers);
router.route("/createUser").post(userController.createUser);
router.route("/getData").post(userController.getData);
router.route("/updateUser/:id").post(userController.updateUser);
router.route("/deleteUser/:id").get(userController.deleteUser);

module.exports = router;
