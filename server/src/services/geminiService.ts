import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class GeminiService {
    private model;

    constructor() {
        // Use the 'gemini-pro' model for text generation
        this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    }

    // Generate a professional profile description
    async generateProfileDescription(skills: string[], bio: string): Promise<string> {
        try {
            const prompt = `
        Act as a professional career consultant. 
        Write a compelling "About Me" section for a junior developer with the following skills: ${skills.join(', ')}.
        Here is their rough bio: "${bio}".
        Make it professional, engaging, and suitable for a LinkedIn profile or CV. 
        Keep it under 150 words.
      `;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
    }
}
