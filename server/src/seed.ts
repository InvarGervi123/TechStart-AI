import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './models/Job';

dotenv.config();

const jobs = [
    {
        title: 'Junior Frontend Developer',
        organizationId: 'org1',
        description: 'Join our team to build amazing React applications.',
        type: 'job',
        location: 'Remote',
        requirements: ['React', 'TypeScript', 'Tailwind CSS']
    },
    {
        title: 'Backend Developer Intern',
        organizationId: 'org2',
        description: 'Learn Node.js and MongoDB with our senior team.',
        type: 'job',
        location: 'Tel Aviv',
        requirements: ['Node.js', 'Express', 'MongoDB']
    },
    {
        title: 'Community Volunteer',
        organizationId: 'org3',
        description: 'Help teach kids to code.',
        type: 'volunteer',
        location: 'Haifa',
        requirements: ['Patience', 'Basic Coding']
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techstart_ai');
        console.log('Connected to DB');

        await Job.deleteMany({});
        await Job.insertMany(jobs);

        console.log('Database seeded!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
};

seedDB();
