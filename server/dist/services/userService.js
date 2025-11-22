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
exports.UserService = void 0;
const User_1 = __importDefault(require("../models/User"));
// Service class for handling User business logic
class UserService {
    // Create a new user
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new User_1.default(userData);
                return yield user.save();
            }
            catch (error) {
                throw new Error(`Error creating user: ${error.message}`);
            }
        });
    }
    // Get user by Firebase UID
    getUserByFirebaseUid(firebaseUid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.findOne({ firebaseUid });
            }
            catch (error) {
                throw new Error(`Error fetching user: ${error.message}`);
            }
        });
    }
    // Update user profile
    updateUser(firebaseUid, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.findOneAndUpdate({ firebaseUid }, updateData, { new: true });
            }
            catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        });
    }
}
exports.UserService = UserService;
