"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const router = (0, express_1.Router)();
const jobController = new jobController_1.JobController();
router.post('/', (req, res) => jobController.createJob(req, res));
router.get('/', (req, res) => jobController.getAllJobs(req, res));
exports.default = router;
