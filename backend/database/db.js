import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDb() {
    const db = await open({
        filename: path.join(__dirname, 'journal.sqlite'),
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS journals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId TEXT NOT NULL,
            ambience TEXT NOT NULL,
            text TEXT NOT NULL,
            emotion TEXT,
            keywords TEXT,
            summary TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}

export { initDb };
