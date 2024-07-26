import { Request, Response } from "express";
import User from "../models/user";
import responseBuilder from "../utils/responseBuilder"; // Adjust the path as needed

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    responseBuilder(res, null, users, "Users retrieved successfully", 200);
  } catch (error) {
    responseBuilder(res, error, null, "Failed to retrieve users", 500);
  }
};

export { getUsers };
