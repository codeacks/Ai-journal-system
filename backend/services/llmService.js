import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';

console.log('LLM Service loaded with provider: Gemini');

// Simple in-memory cache
const analysisCache = new Map();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.LLM_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: process.env.LLM_MODEL || "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
    }
});

async function analyzeJournal(text) {
    // 1. Caching Layer: Hash-based text lookup
    const hash = crypto.createHash('md5').update(text).digest('hex');
    if (analysisCache.has(hash)) {
        console.log('Returning cached analysis result');
        return analysisCache.get(hash);
    }

    const prompt = `
You are an emotion analysis engine.

Your task is to analyze a journal entry and return ONLY valid JSON.

Rules:
1. Return ONLY JSON. No explanations.
2. The JSON must follow this exact schema:
{
  "emotion": string,
  "keywords": string[],
  "summary": string
}

Definitions:
- emotion: the dominant emotional state (calm, anxious, happy, sad, reflective, focused, etc.)
- keywords: 3-5 meaningful words extracted from the journal text
- summary: one short sentence summarizing the emotional experience

If the text is neutral, use emotion "neutral".

Return strictly valid JSON.

Journal entry:
"${text}"
`;

    try {
        console.log('Sending text to Gemini:', text);
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        console.log('Gemini raw response:', responseText);
        
        let parsedResult;
        try {
            parsedResult = JSON.parse(responseText);
        } catch (parseError) {
            // Handle cases where the LLM might have included extra text or markdown
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                parsedResult = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('Failed to parse Gemini response as JSON');
            }
        }

        // Store in cache
        analysisCache.set(hash, parsedResult);
        return parsedResult;

    } catch (error) {
        console.error('Detailed Gemini Analysis Error:', error);
        if (error.response) console.error('Gemini Response Data:', error.response.data);
        throw new Error('Failed to analyze journal entry.');
    }
}

export { analyzeJournal };
