const express = require("express");
const {
  getTicket,
  postTicket,
  getSingleTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");
const noteRouter = require("./noteRoutes");
const ticketRouter = express.Router();

ticketRouter.use("/:id/notes", noteRouter);

ticketRouter.get("/", protect, getTicket);
ticketRouter.get("/:id", protect, getSingleTicket);
ticketRouter.delete("/:id", protect, deleteTicket);
ticketRouter.put("/:id", protect, updateTicket);
ticketRouter.post("/", protect, postTicket);

module.exports = ticketRouter;
