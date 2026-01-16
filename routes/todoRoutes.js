// const express = require("express");
import express from "express";
import processReportRequestController from "../controllers/submitController.js";


const router = express.Router();


router.post("/submit/report-request", processReportRequestController);

export default router;