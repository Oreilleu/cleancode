import { Route } from "../../interfaces/route.interface";
import { BaseController } from "../baseController";
import { httpMethod } from "../../enums/http-methods.enum";
import { CreateScooter } from "./handlers/createScooter";
import { GetAllScooter } from "./handlers/getAllScooter";
import { GetOneScooter } from "./handlers/getOneScooter";
import { EditScooter } from "./handlers/editScooter";
import { DeleteScooter } from "./handlers/deleteScooter";

export class Scootercontroller extends BaseController {
  public path: string = "/scooter";
  protected routes: Route[];

  private createScooter: CreateScooter = new CreateScooter();
  private getAllScooter: GetAllScooter = new GetAllScooter();
  private getOneScooter: GetOneScooter = new GetOneScooter();
  private editScooter: EditScooter = new EditScooter();
  private deleteScooter: DeleteScooter = new DeleteScooter();

  constructor() {
    super();
    this.routes = [
      {
        path: "/create",
        method: httpMethod.POST,
        handler: this.createScooter.handler,
      },
      {
        path: "/get",
        method: httpMethod.GET,
        handler: this.getAllScooter.handler,
      },
      {
        path: "/get-one/:id",
        method: httpMethod.GET,
        handler: this.getOneScooter.handler,
      },
      {
        path: "/put/:id",
        method: httpMethod.PUT,
        handler: this.editScooter.handler,
      },
      {
        path: "/delete/:id",
        method: httpMethod.DELETE,
        handler: this.deleteScooter.handler,
      },
    ];
  }
}
