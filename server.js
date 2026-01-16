import app from "./app.js";
import "dotenv/config";
import { startHourlyEmailBatchWorker } from "./emailBatchWorker.js";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info("API Started.")
  startHourlyEmailBatchWorker();
});