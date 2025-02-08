import { Router } from "express";
import { Route } from "../../interfaces/route.interface";
import { Connection } from "mongoose";

export abstract class BaseController {
  public abstract readonly path: string;
  public router: Router = Router();
  protected abstract readonly routes: Route[];

  public abstract readonly allowDatabase: boolean;
  protected db: Connection | undefined;


  public setRoutes = (): Router | never => {
    for (const route of this.routes) {
      try {
        const middlewares = route.localMiddlewares || [];
        this.router[route.method](route.path, ...middlewares, route.handler);
      } catch (error) {
        console.log("not a valid method: ", error);
      }
    }
    return this.router;
  };
}
