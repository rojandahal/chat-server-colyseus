import { Request, Response } from "express";
import { logger } from "../../middlewares/logger";

export const index = [
  logger, // Adding the middleware to the route
  (req: Request, res: Response) => {
    // Handle login logic here
    res.json({ message: "Index route" });
  },
];

export const show = [
    logger,
    (req: Request, res: Response) => {
        // Handle /users/:id logic here
        res.json({ message: "Show route", id: req.params.id });
    },
]

export const create = [
  logger,
    (req: Request, res: Response) => {
        // Handle register logic here
        res.json({ message: "Create route" });
    },  
];
