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
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const userService = new userService_1.UserService();
class UserController {
    // Register or Sync User from Firebase
    syncUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firebaseUid, email, name, role } = req.body;
                // Check if user exists
                let user = yield userService.getUserByFirebaseUid(firebaseUid);
                if (!user) {
                    // Create new user if not found
                    user = yield userService.createUser({ firebaseUid, email, name, role });
                    return res.status(201).json(user);
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Get current user profile
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firebaseUid } = req.params;
                const user = yield userService.getUserByFirebaseUid(firebaseUid);
                if (!user)
                    return res.status(404).json({ message: 'User not found' });
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
