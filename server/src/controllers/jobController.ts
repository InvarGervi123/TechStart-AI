import { Request, Response } from 'express';
import { JobService } from '../services/jobService';

const jobService = new JobService();

export class JobController {

    // Create a new job
    async createJob(req: Request, res: Response) {
        try {
            const job = await jobService.createJob(req.body);
            return res.status(201).json(job);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Get all jobs
    async getAllJobs(req: Request, res: Response) {
        try {
            const jobs = await jobService.getJobs();
            return res.status(200).json(jobs);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
