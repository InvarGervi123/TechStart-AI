import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    firebaseUid: string;
    email: string;
    name: string;
    role: 'junior' | 'organization' | 'admin';
    bio?: string;
    skills?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['junior', 'organization', 'admin'], default: 'junior' },
    bio: { type: String },
    skills: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
