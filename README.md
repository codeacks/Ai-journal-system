# 🧠 Mindful Collector - AI Journal System

A premium, AI-assisted journaling platform designed for personal growth and emotional clarity.

## ✨ Features
- **Modern UI**: Sleek glassmorphism design with Dark/Light mode support.
- **AI Analysis**: Powered by **Google Gemini** for deep emotional insights.
- **Cloud Database**: Integrated with **MongoDB Atlas**.
- **Responsive**: Fully optimized for mobile and desktop.

---

## 🚀 Deployment Guide (Render)

### 1. Backend (Web Service)
1. In Render, select **New Web Service**.
2. Connect this GitHub Repository.
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. **Environment Variables**:
   - `LLM_API_KEY`: Your Gemini API Key.
   - `MONGO_URI`: Your MongoDB Connection String.
   - `LLM_MODEL`: `gemini-1.5-flash`

### 2. Frontend (Static Site)
1. In Render, select **New Static Site**.
2. Connect this GitHub Repository.
3. Settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: The URL of your backend service (e.g., `https://ai-backend.onrender.com`).

---

## 🛠 Local Setup
1. Clone the repo and run `npm install` in the root.
2. Create `.env` files in both `frontend/` and `backend/`.
3. Run `npm run dev` from the root directory.

