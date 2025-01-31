import { Router } from "express";
import { Route } from "../../interfaces/route.interface";

export abstract class Controller {
  public abstract readonly path: string;
  public router: Router = Router();
  protected abstract readonly routes: Route[];

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
