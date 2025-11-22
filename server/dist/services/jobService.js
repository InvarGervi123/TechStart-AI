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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const Job_1 = __importDefault(require("../models/Job"));
class JobService {
    // Create a new job posting
    createJob(jobData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = new Job_1.default(jobData);
                return yield job.save();
            }
            catch (error) {
                throw new Error(`Error creating job: ${error.message}`);
            }
        });
    }
    // Get all jobs (with optional filtering)
    getJobs() {
        return __awaiter(this, arguments, void 0, function* (filter = {}) {
            try {
                return yield Job_1.default.find(filter).sort({ createdAt: -1 });
            }
            catch (error) {
                throw new Error(`Error fetching jobs: ${error.message}`);
            }
        });
    }
    // Get jobs by organization
    getJobsByOrg(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Job_1.default.find({ organizationId }).sort({ createdAt: -1 });
            }
            catch (error) {
                throw new Error(`Error fetching organization jobs: ${error.message}`);
            }
        });
    }
}
exports.JobService = JobService;
