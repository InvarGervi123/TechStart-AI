import { Router } from 'express';
import { GeminiController } from '../controllers/geminiController';

const router = Router();
const geminiController = new GeminiController();

router.post('/generate-profile', (req, res) => geminiController.generateDescription(req, res));

export default router;
