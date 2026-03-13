# AI-Assisted Journal System

A production-quality prototype for a journaling platform used in ArvyaX immersive nature sessions.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- NPM

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the placeholder provided:
   ```bash
   # Add your LLM API Key
   LLM_API_KEY=your_real_api_key
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000).

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   The frontend will be available at [http://localhost:5173](http://localhost:5173).

## 🛠 Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js, Express.js
- **Database**: SQLite (via `sqlite3` and `sqlite` wrapper)
- **AI**: LLM-powered emotion analysis (compatible with OpenAI/Groq/OpenRouter)
- **Security**: Helmet, Rate Limiting (10 req/min for AI endpoints)
- **Caching**: In-memory hash-based caching for LLM responses.

## 📌 API Endpoints
- `POST /api/journal`: Create a new entry.
- `GET /api/journal/:userId`: Get all entries for a user.
- `POST /api/journal/analyze`: Perform LLM emotion analysis on text.
- `GET /api/journal/insights/:userId`: Get aggregated emotional insights.
# Ai-journal-system
