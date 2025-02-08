import express, { Application } from "express";
import { Server } from "./server";
import { AuthController } from "./controllers/authController";
import cors from "cors";
import "dotenv/config";
import { Request, Response } from "express";

const app: Application = express();

const AppServer: Server = new Server(app, 3000);

(async () => {
  await AppServer.initializeDatabase();

  AppServer.loadGlobalMiddlewares([express.json(), cors()]);
  AppServer.loadControllers([new AuthController()]);

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from api server :" });
  });

  app.all("*", (req: Request, res: Response) => {
    res.status(404).send("Page introuvable");
  });

  AppServer.run();
})();
