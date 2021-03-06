var express = require("express");
var router = express.Router();
const auth = require("../util/auth");

const userController = require("../controllers/users");

router.post("/login", userController.loginUser);
router.post("/signup", userController.signUpUser);
router.post("/image", auth, userController.uploadProfilePhoto);
router.get("/", auth, userController.getUserDetail);
router.post("/", auth, userController.updateUserDetails);

module.exports = router;
