import { Request, Response } from "express";
import { logger } from "../../middlewares/logger";
import asyncHandler from "../../helpers/asyncHandler";
import { protectAdmin } from "../../middlewares/auth";
import User from "../models/UserModel";
import { sendResponse } from "../../helpers/response";

export const index = [
  logger, // Adding the middleware to the route
  asyncHandler(async (req: Request, res: Response) => {
    // Handle /users logic here
    res.json({ message: "Index route" });
  }),
];

export const show = [
  logger,
  asyncHandler(async (req: Request, res: Response) => {
    // Handle /users/:id logic here
    res.json({ message: "Show route" });
  }),
];

export const create = [
  logger,
  asyncHandler(async (req: Request, res: Response) => {
    // Handle /users POST logic here
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    sendResponse(
      res,
      {
        success: true,
        data: user,
      },
      201,
      "application/json",
      false,
      { maxAge: 0 }
    );
  }),
];

export const update = [
  logger,
  protectAdmin, // Adding the middleware to the route
  asyncHandler(async (req: Request, res: Response) => {
    // Handle /users/:id PUT logic here
    res.json({ message: "Update route" });
  }),
];
