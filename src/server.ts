import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import "./shared/container";

import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import { cors } from "./middlewares/cors";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";
import swaggerConfig from "./swagger.json";

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(cors);

app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(errorHandler);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.uow75.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🔥 Server running in http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log("🤔 ", err);
  });
