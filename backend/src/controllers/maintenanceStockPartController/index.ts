import { Route } from "../../interfaces/route.interface";
import { BaseController } from "../baseController";
import { httpMethod } from "../../enums/http-methods.enum";
import { CreateMaintenanceStockPart } from "./handlers/createMaintenanceStockPart";
import { GetAllMaintenanceStockPart } from "./handlers/getAllMaintenanceStockPart";
import { GetOneMaintenanceStockPart } from "./handlers/getOneMaintenanceStockPart";
import { EditMaintenanceStockPart } from "./handlers/editMaintenanceStockPart";
import { DeleteMaintenanceStockPart } from "./handlers/deleteMaintenanceStockPart";

export class MaintenanceStockPartController extends BaseController {
    public path: string = "/maintenance-stock-part";
    protected routes: Route[];

    private createMaintenanceStockPart: CreateMaintenanceStockPart = new CreateMaintenanceStockPart();
    private getAllMaintenanceStockPart: GetAllMaintenanceStockPart = new GetAllMaintenanceStockPart();
    private getOneMaintenanceStockPart: GetOneMaintenanceStockPart = new GetOneMaintenanceStockPart();
    private editMaintenanceStockPart: EditMaintenanceStockPart = new EditMaintenanceStockPart();
    private deleteMaintenanceStockPart: DeleteMaintenanceStockPart = new DeleteMaintenanceStockPart();

    constructor() {
        super();
        this.routes = [
            {
                path: "/create",
                method: httpMethod.POST,
                handler: this.createMaintenanceStockPart.handler,
            },
            {
                path: "/get",
                method: httpMethod.GET,
                handler: this.getAllMaintenanceStockPart.handler,
            },
            {
                path: "/get-one/:id",
                method: httpMethod.GET,
                handler: this.getOneMaintenanceStockPart.handler,
            },
            {
                path: "/put/:id",
                method: httpMethod.PUT,
                handler: this.editMaintenanceStockPart.handler,
            },
            {
                path: "/delete/:id",
                method: httpMethod.DELETE,
                handler: this.deleteMaintenanceStockPart.handler,
            },
        ];
    }
}
