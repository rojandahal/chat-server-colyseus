import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response";
import passport from "passport";

export const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return sendResponse(
        res,
        {
          success: false,
          error: info.message,
        },
        401,
        "application/json",
        false,
        { maxAge: 0 }
      );
    }
    req.user = user;
    next();
  })(req, res, next);
};
