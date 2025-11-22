"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
const userController = new userController_1.UserController();
// Routes
router.post('/sync', (req, res) => userController.syncUser(req, res));
router.get('/:firebaseUid', (req, res) => userController.getProfile(req, res));
exports.default = router;
