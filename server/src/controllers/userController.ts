import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {

    // Register or Sync User from Firebase
    async syncUser(req: Request, res: Response) {
        try {
            const { firebaseUid, email, name, role } = req.body;

            // Check if user exists
            let user = await userService.getUserByFirebaseUid(firebaseUid);

            if (!user) {
                // Create new user if not found
                user = await userService.createUser({ firebaseUid, email, name, role });
                return res.status(201).json(user);
            }

            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Get current user profile
    async getProfile(req: Request, res: Response) {
        try {
            const { firebaseUid } = req.params;
            const user = await userService.getUserByFirebaseUid(firebaseUid);

            if (!user) return res.status(404).json({ message: 'User not found' });

            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
