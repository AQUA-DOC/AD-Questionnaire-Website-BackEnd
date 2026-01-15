// const express = require("express");
import express from "express";
import processReportRequestController from "../controllers/submitController.js";


const router = express.Router();


// const todoController = require("../controllers/todoController");
// const submitController = require("../controllers/submitController");

// router.get("/", todoController.getAllTodos);
// router.get("/:id", todoController.getTodoById);
// router.post("/", todoController.createTodo);
// router.put("/:id", todoController.updateTodo);
// router.delete("/:id", todoController.deleteTodo);


router.post("/submit/report-request", processReportRequestController);

export default router;