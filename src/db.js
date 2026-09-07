import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.resolve(import.meta.dirname, "..", "db.json");

/**
 * Load the entire JSON database.
 * @returns {Promise<Object>}
 */
export async function loadDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (err) {
    // If the file is missing or corrupted, start with a fresh structure
    return { conversations: {} };
  }
}

/**
 * Save the whole database back to disk.
 * @param {Object} db
 * @returns {Promise<void>}
 */
export async function saveDB(db) {
  const json = JSON.stringify(db, null, 2);
  await fs.writeFile(DB_PATH, json, "utf8");
}

/**
 * Append a message to a user's conversation history.
 * @param {string} userId – Viber sender ID.
 * @param {string} role – "user" or "assistant".
 * @param {string} content – Message text.
 */
export async function addMessage(userId, role, content) {
  const db = await loadDB();
  if (!db.conversations[userId]) {
    db.conversations[userId] = [];
  }
  db.conversations[userId].push({ role, content, timestamp: new Date().toISOString() });
  await saveDB(db);
}

/**
 * Retrieve the full history for a user.
 * @param {string} userId
 * @returns {Promise<Array<{role:string,content:string,timestamp:string}>>}
 */
export async function getHistory(userId) {
  const db = await loadDB();
  return db.conversations[userId] || [];
}