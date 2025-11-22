import User, { IUser } from '../models/User';

// Service class for handling User business logic
export class UserService {

    // Create a new user
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    // Get user by Firebase UID
    async getUserByFirebaseUid(firebaseUid: string): Promise<IUser | null> {
        try {
            return await User.findOne({ firebaseUid });
        } catch (error: any) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }

    // Update user profile
    async updateUser(firebaseUid: string, updateData: Partial<IUser>): Promise<IUser | null> {
        try {
            return await User.findOneAndUpdate({ firebaseUid }, updateData, { new: true });
        } catch (error: any) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }
}
