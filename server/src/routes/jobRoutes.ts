import { Router } from 'express';
import { JobController } from '../controllers/jobController';

const router = Router();
const jobController = new JobController();

router.post('/', (req, res) => jobController.createJob(req, res));
router.get('/', (req, res) => jobController.getAllJobs(req, res));

export default router;
