import { Response } from "express";

interface ResponseData {
  error: any;
  data: any;
  message: string | null;
  statusCode: number;
}

function responseBuilder(
  res: Response,
  error: any = null,
  data: any = null,
  message: string | null = null,
  statusCode: number = 200
): Response {
  const responseData: ResponseData = {
    error,
    data,
    message,
    statusCode,
  };

  return res.status(statusCode).send(responseData);
}

export default responseBuilder;
