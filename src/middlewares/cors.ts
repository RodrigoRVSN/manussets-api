import { NextFunction, Request, Response } from "express";

const cors = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.setHeader("Access-Control-Allow-Headers", "x-app-id");
  response.setHeader("Access-Control-Max-Age", "10");
  next();
};

export { cors };
