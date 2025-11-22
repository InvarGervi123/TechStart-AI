"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const jobService_1 = require("../services/jobService");
const jobService = new jobService_1.JobService();
class JobController {
    // Create a new job
    createJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield jobService.createJob(req.body);
                return res.status(201).json(job);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Get all jobs
    getAllJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield jobService.getJobs();
                return res.status(200).json(jobs);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.JobController = JobController;
