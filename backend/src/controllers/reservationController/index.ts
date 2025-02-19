import { Route } from "../../interfaces/route.interface";
import { BaseController } from "../baseController";
import { httpMethod } from "../../enums/http-methods.enum";
import { createReservation } from "./handlers/createReservation";

export class ReservationController extends BaseController {
  public path: string = "/reservation";
  protected routes: Route[];

  private createReservation: createReservation = new createReservation();

  constructor() {
    super();
    this.routes = [
      {
        path: "/create",
        method: httpMethod.POST,
        handler: this.createReservation.handler,
      },
    ];
  }
}
