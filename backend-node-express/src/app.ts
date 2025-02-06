import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { ParsedEnvVariables } from "./configs";
import { ErrorHandler } from "./middlewares";
import { authRoutes, companyRoutes, jobRoutes, userRoutes } from "./routes";

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

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use(ErrorHandler);

export default app;
