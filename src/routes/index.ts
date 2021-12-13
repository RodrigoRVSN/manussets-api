import { Router } from "express";

import { assetsRoutes } from "./assets.routes";

const routes = Router();

routes.use("/assets", assetsRoutes);

export { routes };
