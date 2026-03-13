import { getDb } from "../database/db.js";

function parseKeywords(rawKeywords) {
  if (!rawKeywords) return [];
  try {
    const parsed = JSON.parse(rawKeywords);
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function normalizeEntry(row) {
  if (!row) return null;
  return {
    ...row,
    keywords: parseKeywords(row.keywords),
  };
}

export async function createJournalEntry({ userId, ambience, text }) {
  const db = await getDb();
  const createdAt = new Date().toISOString();

  const result = await db.run(
    `
      INSERT INTO journals (userId, ambience, text, createdAt)
      VALUES (?, ?, ?, ?)
    `,
    [userId, ambience, text, createdAt]
  );

  const row = await db.get(`SELECT * FROM journals WHERE id = ?`, [result.lastID]);
  return normalizeEntry(row);
}

export async function getJournalEntriesByUserId(userId) {
  const db = await getDb();
  const rows = await db.all(
    `
      SELECT * FROM journals
      WHERE userId = ?
      ORDER BY datetime(createdAt) DESC, id DESC
    `,
    [userId]
  );

  return rows.map(normalizeEntry);
}

export async function getJournalEntryById(id) {
  const db = await getDb();
  const row = await db.get(`SELECT * FROM journals WHERE id = ?`, [id]);
  return normalizeEntry(row);
}

export async function updateJournalAnalysisById(id, { emotion, keywords, summary }) {
  const db = await getDb();

  await db.run(
    `
      UPDATE journals
      SET emotion = ?, keywords = ?, summary = ?
      WHERE id = ?
    `,
    [emotion, JSON.stringify(keywords), summary, id]
  );

  const updated = await db.get(`SELECT * FROM journals WHERE id = ?`, [id]);
  return normalizeEntry(updated);
}

