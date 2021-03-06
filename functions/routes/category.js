var express = require("express");
var router = express.Router();
const auth = require("../util/auth");

const categoryController = require("../controllers/category");

router.get("/", auth, categoryController.getCategories);
router.post("/", auth, categoryController.newCategory);
router.put("/:categoryId", auth, categoryController.updateCategory);
router.delete("/:categoryId", auth, categoryController.deleteCategory);

module.exports = router;
