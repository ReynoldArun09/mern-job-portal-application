import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { ParsedEnvVariables } from "./configs/app.config";

const app: Application = express();
const swaggerSpec = YAML.load("./src/lib/swagger.yaml");
app.use(
  cors({
    origin: ParsedEnvVariables.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.disable("x-powered-by");

if (ParsedEnvVariables.NODE_ENV !== "production") {
  app.use(
    "/api/v1/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, {
      swaggerOptions: {
        withCredentials: true,
      },
    })
  );
}

export default app;
