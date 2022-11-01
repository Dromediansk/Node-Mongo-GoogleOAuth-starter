import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const handleGeneralError: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
  next();
};
