const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getNotes, createNote } = require("../controllers/notesController");

const noteRouter = express.Router({ mergeParams: true });

noteRouter.get("/", protect, getNotes);
noteRouter.post("/", protect, createNote);

module.exports = noteRouter;
