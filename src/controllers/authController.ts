import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import responseBuilder from "../utils/responseBuilder";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return responseBuilder(
        res,
        { message: "User already exists" },
        null,
        "User already exists",
        400
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      return responseBuilder(
        res,
        null,
        {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id.toString()),
        },
        "User registered successfully",
        201
      );
    } else {
      return responseBuilder(res, { message: "Invalid user data" }, null, "Invalid user data", 400);
    }
  } catch (error) {
    return responseBuilder(res, error, null, "Server error, please try again later.", 500);
  }
};

const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return responseBuilder(
        res,
        null,
        {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id.toString()),
        },
        "User logged in successfully",
        200
      );
    } else {
      return responseBuilder(
        res,
        { message: "Invalid email or password" },
        null,
        "Invalid email or password",
        401
      );
    }
  } catch (error) {
    return responseBuilder(res, error, null, "Server error, please try again later.", 500);
  }
};

export { registerUser, authUser };
