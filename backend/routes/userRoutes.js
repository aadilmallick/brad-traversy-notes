const express = require("express");
const { login, register, getMe } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/", register);
userRouter.post("/login", login);
userRouter.get("/me", protect, getMe);

module.exports = userRouter;
