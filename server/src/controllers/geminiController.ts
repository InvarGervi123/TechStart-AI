import { Request, Response } from 'express';
import { GeminiService } from '../services/geminiService';

const geminiService = new GeminiService();

export class GeminiController {

    // Generate profile description
    async generateDescription(req: Request, res: Response) {
        try {
            const { skills, bio } = req.body;

            if (!skills || !bio) {
                return res.status(400).json({ message: 'Skills and bio are required' });
            }

            const description = await geminiService.generateProfileDescription(skills, bio);
            return res.status(200).json({ description });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
