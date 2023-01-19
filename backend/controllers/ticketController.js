const Ticket = require("../models/ticketModel");
require("express-async-errors");

/**
 * gets a ticket at the GET /api/tickets route
 */
const getTicket = async (req, res, next) => {
  /**
   * @type {{name: string, email: string, _id: string}}
   */
  const user = req.user;

  const tickets = await Ticket.find({ user: user._id });
  res.json(tickets);
};

const getSingleTicket = async (req, res, next) => {
  const user = req.user;
  const ticketId = req.params.id;
  console.log(user);
  console.log(ticketId);

  const ticket = await Ticket.findById(ticketId);
  console.log(ticket);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // if ticket does not belong to user
  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
  res.json(ticket);
};

const deleteTicket = async (req, res, next) => {
  const user = req.user;
  const ticketId = req.params.id;
  console.log(user);
  console.log(ticketId);

  const ticket = await Ticket.findById(ticketId);
  console.log(ticket);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // if ticket does not belong to user
  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await ticket.remove();
  res.json({ success: true });
};

const updateTicket = async (req, res, next) => {
  const user = req.user;
  const ticketId = req.params.id;
  console.log(ticketId);

  const ticket = await Ticket.findById(ticketId);
  console.log(ticket);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // if ticket does not belong to user
  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    ticketId,
    {
      ...req.body,
    },
    { new: true }
  );
  res.json(updatedTicket);
};

const postTicket = async (req, res, next) => {
  const user = req.user;

  const { product, description, status = "new" } = req.body;

  if (!product || !description) {
    throw new Error("please add product and description");
  }

  const ticket = await Ticket.create({
    user: user._id,
    product,
    description,
    status,
  });
  res.json(ticket);
};

module.exports = {
  getTicket,
  postTicket,
  getSingleTicket,
  deleteTicket,
  updateTicket,
};
