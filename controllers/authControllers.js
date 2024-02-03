import { User } from "../models/userModel.js";
import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hasPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({ ...req.body, password: hasPassword });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
