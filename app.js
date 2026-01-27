import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";

import { queueSize } from "./store/emailQueue.js";


const app = express();

// middleware
// app.use(cors());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? "https://aquadocinc.org"
      : true
  })
);
app.use(express.json());


// health
app.get("/backend/health", (req, res) => {
  res.json({ ok: true });
});

// return queue size
app.get("/backend/queue-size", (req, res) => {
  res.json({inQueue: queueSize()})
});

// routes
app.use("/backend", router);

export default app;