import { Route } from "../../interfaces/route.interface";
import { Controller } from "../baseController";
import { Login } from "./handlers/login";
import { httpMethod } from "../../enums/http-methods.enum";
import { Register } from "./handlers/register";

export class AuthController extends Controller {
  public path: string = "/auth";
  protected routes: Route[];

  private login: Login = new Login();
  private register: Register = new Register();

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
    ];
  }
}
