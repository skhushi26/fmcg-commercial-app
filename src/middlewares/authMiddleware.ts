import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import responseBuilder from "../utils/responseBuilder"; // Adjust the path as needed

interface AuthRequest extends Request {
  user?: IUser | null;
}

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.FMCG_JWT_SECRET!) as jwt.JwtPayload;

      req.user = (await User.findById(decoded.id).select("-password")) as IUser | null;
      next();
    } catch (error) {
      return responseBuilder(res, error, null, "Not authorized, token failed", 401);
    }
  } else {
    return responseBuilder(res, null, null, "Not authorized, no token", 401);
  }
};

const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return responseBuilder(res, null, null, "Not authorized as an admin", 403);
  }
};

export { protect, admin };
