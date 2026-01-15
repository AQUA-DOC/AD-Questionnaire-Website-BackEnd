import "dotenv/config";
import express from "express";
import cors from "cors";

import router from "./routes/todoRoutes.js";

// const todoRoutes = require("./routes/todoRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// routes
app.use("/", router);

export default app;