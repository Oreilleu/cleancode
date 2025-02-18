import { Route } from "../../interfaces/route.interface";
import { BaseController } from "../baseController";
import { httpMethod } from "../../enums/http-methods.enum";
import { CreatePart } from "./handlers/createPart";
import { GetAllPart } from "./handlers/getAllPart";
import { GetOnePart } from "./handlers/getOnePart";
import { GetPartByModel } from "./handlers/getPartByModel";
import { EditPart } from "./handlers/editPart";
import { DeletePart } from "./handlers/deletePart";

export class PartController extends BaseController {
  public path: string = "/part";
  protected routes: Route[];

  private createPart: CreatePart = new CreatePart();
  private getAllPart: GetAllPart = new GetAllPart();
  private getOnePart: GetOnePart = new GetOnePart();
  private getPartByModel: GetPartByModel = new GetPartByModel();
  private editPart: EditPart = new EditPart();
  private deletePart: DeletePart = new DeletePart();

  constructor() {
    super();
    this.routes = [
      {
        path: "/create",
        method: httpMethod.POST,
        handler: this.createPart.handler,
      },
      {
        path: "/get",
        method: httpMethod.GET,
        handler: this.getAllPart.handler,
      },
      {
        path: "/get-one/:id",
        method: httpMethod.GET,
        handler: this.getOnePart.handler,
      },
      {
        path: "/get-by-model/:scooterModel",
        method: httpMethod.GET,
        handler: this.getPartByModel.handler,
      },
      {
        path: "/put/:id",
        method: httpMethod.PUT,
        handler: this.editPart.handler,
      },
      {
        path: "/delete/:id",
        method: httpMethod.DELETE,
        handler: this.deletePart.handler,
      },
    ];
  }
}
