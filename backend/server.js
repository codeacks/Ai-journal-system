import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './database/mongoDb.js';
import journalRoutes from './routes/journalRoutes.js';

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', journalRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
