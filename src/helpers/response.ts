import { Response } from "express";

interface SendResponseOptions {
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
}

export const sendResponse = (
  res: Response,
  data: any,
  statusCode: number,
  header: string,
  setCookie: boolean,
  options?: SendResponseOptions
) => {
  res.setHeader("Content-Type", header);

  // Ensure statusCode is a valid number
  const validStatusCode = typeof statusCode === 'number' && statusCode >= 100 && statusCode < 600 ? statusCode : 500;

  // If there is a cookie set in response
  if (setCookie) {
    if (res.req.isAuthenticated()) {
      // Set session data if needed
      (res.req.session as any).token = data.token;
    }
    return res
      .status(validStatusCode)
      .cookie("token", data.token, options)
      .json(data);
  }

  return res.status(validStatusCode).json(data);
};