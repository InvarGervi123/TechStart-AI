import Job, { IJob } from '../models/Job';

export class JobService {

    // Create a new job posting
    async createJob(jobData: Partial<IJob>): Promise<IJob> {
        try {
            const job = new Job(jobData);
            return await job.save();
        } catch (error: any) {
            throw new Error(`Error creating job: ${error.message}`);
        }
    }

    // Get all jobs (with optional filtering)
    async getJobs(filter: any = {}): Promise<IJob[]> {
        try {
            return await Job.find(filter).sort({ createdAt: -1 });
        } catch (error: any) {
            throw new Error(`Error fetching jobs: ${error.message}`);
        }
    }

    // Get jobs by organization
    async getJobsByOrg(organizationId: string): Promise<IJob[]> {
        try {
            return await Job.find({ organizationId }).sort({ createdAt: -1 });
        } catch (error: any) {
            throw new Error(`Error fetching organization jobs: ${error.message}`);
        }
    }
}
