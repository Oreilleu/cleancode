import { Application, RequestHandler } from "express";
import { Controller } from "../controllers/baseController";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class Server {
  private mongoose = new MongooseService();

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

  public loadControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.app.use(controller.path, controller.setRoutes());
    });
  }

  public async initializeDatabase(): Promise<void> {
    await this.mongoose.connectDatabase();
  }
}
