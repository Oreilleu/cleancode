import { Application, RequestHandler } from "express";
import { BaseController } from "../controllers/baseController";
import { Connection } from "mongoose";
import { DatabaseManager } from "../services/database/database.manager";

export class Server {
  public database: Connection | undefined;

  constructor(private app: Application, private readonly port: number) {}

  public run(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  public loadGlobalMiddlewares(middlewares: RequestHandler[]): void {
    middlewares.forEach((middleware: RequestHandler) => {
      this.app.use(middleware);
    });
  }

  public loadControllers(controllers: BaseController[]): void {
    controllers.forEach((controller: BaseController) => {
      this.app.use(controller.path, controller.setRoutes());
    });
  }

  public async initializeDatabase(): Promise<void> {
    await DatabaseManager.connectAll();
  }
}
