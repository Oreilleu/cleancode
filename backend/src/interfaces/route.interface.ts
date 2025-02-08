import { Response, Request, NextFunction } from "express";
import { httpMethod } from "../enums/http-methods.enum";

export interface Route {
  path: string;
  method: httpMethod;
  handler: (req: Request, res: Response) => void;
  localMiddlewares?: ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => void)[];
}
