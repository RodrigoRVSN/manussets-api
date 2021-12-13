/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.log(`Error handler! ⚠️ -> ${error}`);

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
};

export { errorHandler };
