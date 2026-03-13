import { analyzeJournal } from '../services/llmService.js';
import { generateInsights } from '../services/insightsService.js';
import Journal from '../models/MongoJournal.js';

const createEntry = async (req, res) => {
    const { userId, ambience, text } = req.body;
    if (!userId || !ambience || !text) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newEntry = await Journal.create({
            userId,
            ambience,
            text
        });
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

const getEntries = async (req, res) => {
    const { userId } = req.params;
    try {
        const entries = await Journal.find({ userId }).sort({ createdAt: -1 });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

const analyzeEntry = async (req, res) => {
    const { text, entryId } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Missing text to analyze' });
    }

    try {
        console.log('Analyzing entry ID:', entryId);
        const analysis = await analyzeJournal(text);
        console.log('Analysis result:', analysis);
        
        if (entryId) {
            await Journal.findByIdAndUpdate(entryId, {
                emotion: analysis.emotion,
                keywords: analysis.keywords,
                summary: analysis.summary
            });
        }

        res.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'LLM Analysis failed' });
    }
};

const getInsights = async (req, res) => {
    const { userId } = req.params;
    try {
        const entries = await Journal.find({ userId });
        const insights = generateInsights(entries);
        res.json(insights);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

export {
    createEntry,
    getEntries,
    analyzeEntry,
    getInsights
};
