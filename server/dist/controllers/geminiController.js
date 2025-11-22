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
exports.GeminiController = void 0;
const geminiService_1 = require("../services/geminiService");
const geminiService = new geminiService_1.GeminiService();
class GeminiController {
    // Generate profile description
    generateDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { skills, bio } = req.body;
                if (!skills || !bio) {
                    return res.status(400).json({ message: 'Skills and bio are required' });
                }
                const description = yield geminiService.generateProfileDescription(skills, bio);
                return res.status(200).json({ description });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.GeminiController = GeminiController;
