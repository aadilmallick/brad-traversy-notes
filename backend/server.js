const express = require("express");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const ticketRouter = require("./routes/ticketRoutes");
require("express-async-errors");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
app.use(errorHandler); // always define error handler last!!!

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
