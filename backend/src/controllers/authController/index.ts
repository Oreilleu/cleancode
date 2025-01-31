import { Route } from "../../interfaces/route.interface";
import { BaseController } from "../baseController";
import { Login } from "./handlers/login";
import { httpMethod } from "../../enums/http-methods.enum";
import { Register } from "./handlers/register";

export class AuthController extends BaseController {
  public path: string = "/auth";
  protected routes: Route[];
  public allowDatabase: boolean = true;

  private login: Login = new Login(this);
  private register: Register = new Register(this);

  constructor() {
    super();
    this.routes = [
      {
        path: "/login",
        method: httpMethod.GET,
        localMiddlewares: this.login.middlewares,
        handler: this.login.handler,
      },
      {
        path: "/register",
        method: httpMethod.GET,
        handler: this.register.handler,
      },
    ];
  }

  public getDatabase(): typeof this.db {
    return this.db;
  }
}
