import app from "./app.js";
import "dotenv/config";
import { startHourlyEmailBatchWorker } from "./emailBatchWorker.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  startHourlyEmailBatchWorker();
});