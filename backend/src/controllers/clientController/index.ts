import { Route } from "../../interfaces/route.interface";
import { BaseController } from "../baseController";
import { httpMethod } from "../../enums/http-methods.enum";
import { createClient } from "./handlers/createClient";
import { getAllClient } from "./handlers/getAllClient";

export class ClientController extends BaseController {
  public path: string = "/client";
  protected routes: Route[];

  private createClient: createClient = new createClient();
  private getAllClient: getAllClient = new getAllClient();

  constructor() {
    super();
    this.routes = [
      {
        path: "/create",
        method: httpMethod.POST,
        handler: this.createClient.handler,
      },
      {
        path: "/get",
        method: httpMethod.GET,
        handler: this.getAllClient.handler,
      },
    ];
  }
}