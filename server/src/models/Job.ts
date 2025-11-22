import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
    title: string;
    organizationId: string; // Firebase UID of the organization
    description: string;
    requirements: string[];
    type: 'job' | 'volunteer';
    location: string;
    createdAt: Date;
    updatedAt: Date;
}

const JobSchema: Schema = new Schema({
    title: { type: String, required: true },
    organizationId: { type: String, required: true, index: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    type: { type: String, enum: ['job', 'volunteer'], default: 'job' },
    location: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IJob>('Job', JobSchema);
