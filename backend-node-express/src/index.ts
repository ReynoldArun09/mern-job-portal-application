import app from "./app";
import { ParsedEnvVariables } from "./configs/app.config";
import { GlobalErrorMessages } from "./constants/globalError.messages";
import { GlobalSuccessMessages } from "./constants/globalSuccess.messages";
import { logger } from "./utils/custom.logger";

const PORT = ParsedEnvVariables.PORT;
const ENV = ParsedEnvVariables.NODE_ENV;

async function startServer() {
  try {
    app.listen(PORT, () => {
      ENV === "development" ? logger.info(GlobalSuccessMessages.DEV_SERVER_STARTED) : logger.info(GlobalSuccessMessages.SERVER_STARTED);
    });
  } catch (error) {
    ENV === "development"
      ? logger.error(GlobalErrorMessages.DEV_SERVER_FAILED_TO_START, error)
      : logger.error(GlobalErrorMessages.SERVER_FAILED_TO_START, error);
    process.exit(1);
  }
}

startServer();

process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error: Error) => {
  logger.error("Unhandled Rejection at:", error);
  process.exit(1);
});
