var express = require("express");
var router = express.Router();
const auth = require("../util/auth");

const noteController = require("../controllers/note");

router.get("/", auth, noteController.getNotes);
router.post("/", auth, noteController.newNote);
router.put("/:noteId", auth, noteController.updateNote);
router.delete("/:noteId", auth, noteController.deleteNote);

module.exports = router;
