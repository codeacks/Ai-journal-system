import express from 'express';
const router = express.Router();
import * as journalController from '../controllers/journalController.js';
import rateLimit from 'express-rate-limit';

// Rate limiting for AI analysis to protect the LLM endpoint
const analysisLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Max 10 requests per minute
    message: { error: 'Too many analysis requests, please try again later.' }
});

router.post('/journal', journalController.createEntry);
router.get('/journal/:userId', journalController.getEntries);
router.post('/journal/analyze', analysisLimiter, journalController.analyzeEntry);
router.get('/journal/insights/:userId', journalController.getInsights);

export default router;
