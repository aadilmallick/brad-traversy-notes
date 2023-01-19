const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");
require("express-async-errors");

const getNotes = async (req, res, next) => {
  const user = req.user;
  const ticketId = req.params.id;
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // if ticket does not belong to user
  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const notes = await Note.find({ ticket: ticketId });
  res.json(notes);
};

const createNote = async (req, res, next) => {
  const user = req.user;
  const ticketId = req.params.id;
  const ticket = await Ticket.findById(ticketId);
  const { text } = req.body;

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (!text) {
    res.status(404);
    throw new Error("Must add text!");
  }

  // if ticket does not belong to user
  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const note = await Note.create({ ticket: ticketId, text, user: user._id });
  res.json(note);
};

module.exports = { getNotes, createNote };
