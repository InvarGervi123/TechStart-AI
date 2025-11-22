import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
import geminiRoutes from './routes/geminiRoutes';

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', geminiRoutes);

app.get('/', (req, res) => {
    res.send('TechStart AI API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
