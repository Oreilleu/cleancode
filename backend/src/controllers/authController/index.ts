import { Route } from "../../interfaces/route.interface";
import { BaseController } from "../baseController";
import { Login } from "./handlers/login";
import { httpMethod } from "../../enums/http-methods.enum";
import { Register } from "./handlers/register";
import { VerifyToken } from "./handlers/verifyToken";

export class AuthController extends BaseController {
  public path: string = "/auth";
  protected routes: Route[];

  private login: Login = new Login();
  private register: Register = new Register();
  private verifyToken: VerifyToken = new VerifyToken();

  constructor() {
    super();
    this.routes = [
      {
        path: "/login",
        method: httpMethod.POST,
        handler: this.login.handler,
      },
      {
        path: "/register",
        method: httpMethod.POST,
        handler: this.register.handler,
      },
      {
        path: "/verify-token",
        method: httpMethod.GET,
        handler: this.verifyToken.handler,
        localMiddlewares: this.verifyToken.localMiddlewares,
      },
    ];
  }
}
