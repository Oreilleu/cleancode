import express, { Application } from "express";
import { Server } from "./server";
import { AuthController } from "./controllers/authController";
import cors from "cors";
import "dotenv/config";

const app: Application = express();

const AppServer: Server = new Server(app, 3000);

(async () => {
  await AppServer.initializeDatabase();

  AppServer.loadGlobalMiddlewares([express.json(), cors()]);

  AppServer.loadControllers([new AuthController()]);

  AppServer.run();
})();
