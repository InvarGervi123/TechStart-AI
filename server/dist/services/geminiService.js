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
exports.GeminiService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Gemini API
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
class GeminiService {
    constructor() {
        // Use the 'gemini-pro' model for text generation
        this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    }
    // Generate a professional profile description
    generateProfileDescription(skills, bio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prompt = `
        Act as a professional career consultant. 
        Write a compelling "About Me" section for a junior developer with the following skills: ${skills.join(', ')}.
        Here is their rough bio: "${bio}".
        Make it professional, engaging, and suitable for a LinkedIn profile or CV. 
        Keep it under 150 words.
      `;
                const result = yield this.model.generateContent(prompt);
                const response = yield result.response;
                return response.text();
            }
            catch (error) {
                throw new Error(`Gemini API Error: ${error.message}`);
            }
        });
    }
}
exports.GeminiService = GeminiService;
