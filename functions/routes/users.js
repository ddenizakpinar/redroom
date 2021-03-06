var express = require("express");
var router = express.Router();
const auth = require("../util/auth");

const userController = require("../controllers/users");

router.post("/login", userController.loginUser);
router.post("/signup", userController.signUpUser);
router.post("/user/image", auth, userController.uploadProfilePhoto);
router.get("/user", auth, userController.getUserDetail);
router.post("/user", auth, userController.updateUserDetails);

module.exports = router;
