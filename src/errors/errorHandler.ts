import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../helpers/response";
import ApiError from "./ApiError";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log to console for dev
  //   console.log(error);
  let err = { ...error };
  err.message = error.message || "Server Error";

  // Mongoose bad ObjectId
  if (error.name === "CastError") {
    const message = `Resources not found with id of ${error.value}`;
    err = ApiError.notfound(message);
  }
  // Mongoose duplicate key
  if (error.code === 11000) {
    const message = `Duplicate field value entered ${error.value}`;
    err = ApiError.duplicateField(message);
  }
  // Mongoose validation error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val: any) => val.message);
    err = ApiError.validationError(message.join(", "));
  }

  if (error.code === "EBADCSRFTOKEN") {
    const message = "Invalid CSRF Token";
    err = ApiError.forbidden(message);
  }

  sendResponse(
    res,
    {
      success: false,
      error: err.message || "Server Error",
    },
    err.code ? err.code : 500,
    "application/json",
    false,
    { maxAge: 0 }
  );
};

export default errorHandler;
