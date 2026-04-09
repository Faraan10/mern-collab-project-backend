import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // checking if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("user already exists");
  }

  // hashing password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // creating user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "user registered successfully",
    user, // Note: we removed password already in userModel via toJSON
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    res.status(400);
    throw new Error("user does not exist");
  }

  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    res.status(401);
    throw new Error("invalid login credentials");
  }

  const token = generateToken(findUser._id);

  res.status(200).json({
    message: "Login successfull",
    token,
    user: findUser, // password is removed in the schema
  });
});
