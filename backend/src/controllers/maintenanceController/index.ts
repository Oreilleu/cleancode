import { Route } from "../../interfaces/route.interface";
import { BaseController } from "../baseController";
import { httpMethod } from "../../enums/http-methods.enum";
import { CreateMaintenance } from "./handlers/createMaintenance";
import { GetAllMaintenance } from "./handlers/getAllMaintenance";
import { GetOneMaintenance } from "./handlers/getOneMaintenance";
import { EditMaintenance } from "./handlers/editMaintenance";
import { DeleteMaintenance } from "./handlers/deleteMaintenance";

export class MaintenanceController extends BaseController {
    public path: string = "/maintenance";
    protected routes: Route[];

    private createMaintenance: CreateMaintenance = new CreateMaintenance();
    private getAllMaintenance: GetAllMaintenance = new GetAllMaintenance();
    private getOneMaintenance: GetOneMaintenance = new GetOneMaintenance();
    private editMaintenance: EditMaintenance = new EditMaintenance();
    private deleteMaintenance: DeleteMaintenance = new DeleteMaintenance();

    constructor() {
        super();
        this.routes = [
            {
                path: "/create",
                method: httpMethod.POST,
                handler: this.createMaintenance.handler,
            },
            {
                path: "/get",
                method: httpMethod.GET,
                handler: this.getAllMaintenance.handler,
            },
            {
                path: "/get-one/:id",
                method: httpMethod.GET,
                handler: this.getOneMaintenance.handler,
            },
            {
                path: "/put/:id",
                method: httpMethod.PUT,
                handler: this.editMaintenance.handler,
            },
            {
                path: "/delete/:id",
                method: httpMethod.DELETE,
                handler: this.deleteMaintenance.handler,
            },
        ];
    }
}
