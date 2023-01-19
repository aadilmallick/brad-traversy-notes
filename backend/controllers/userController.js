const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("express-async-errors");

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
/**
 * the register controller. The req.body should be {username, email, password}
 */
const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(username, password, email);
  if (!username | !password | !email) {
    throw new Error(`what the hell? You sent: ${JSON.stringify(req.body)}`);
  }

  // find if user exists. If so, then throw error because that's not allowed
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User is already registerex!!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: username,
    email,
    password: hashedPassword,
  });
  res.json({
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

/**
 * The login controller.
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email | !password) {
    res.status(400);
    throw new Error("email and password not specified");
  }
  const userExists = await User.findOne({ email });
  const passwordIsCorrect = await bcrypt.compare(password, userExists.password);
  if (userExists && passwordIsCorrect) {
    return res.json({
      name: userExists.name,
      token: generateToken(userExists._id),
      email: userExists.email,
    });
  }
  throw new Error("invalid credentials!");
};

const getMe = async (req, res, next) => {
  const { _id: id, name, email, isAdmin } = req.user;
  res.json({ id, name, email });
};

module.exports = { register, login, getMe };
