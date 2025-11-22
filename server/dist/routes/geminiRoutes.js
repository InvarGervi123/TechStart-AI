"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geminiController_1 = require("../controllers/geminiController");
const router = (0, express_1.Router)();
const geminiController = new geminiController_1.GeminiController();
router.post('/generate-profile', (req, res) => geminiController.generateDescription(req, res));
exports.default = router;
