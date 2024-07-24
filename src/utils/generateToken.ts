import jwt from "jsonwebtoken";

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.FMCG_JWT_SECRET!, {
    expiresIn: "20d",
  });
};

export default generateToken;
