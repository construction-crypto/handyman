import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const apiDir = path.join(process.cwd(), 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

const dbPath = path.join(apiDir, 'database.sqlite');
const db = new Database(dbPath);

// Create table if not exists based on project requirements
db.exec(\
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    client_token TEXT UNIQUE NOT NULL,
    current_phase TEXT NOT NULL,
    progress INTEGER NOT NULL,
    cure_status TEXT,
    created_at TEXT NOT NULL
  );
\);

// Insert test record
const insert = db.prepare(\
  INSERT OR REPLACE INTO projects (id, client_token, current_phase, progress, cure_status, created_at)
  VALUES (?, ?, ?, ?, ?, ?)
\);

insert.run(
  'proj-001',
  'test-token-123',
  'Surface Preparation & Moisture Testing',
  35,
  'Pending Topcoat (Moisture < 12%)',
  new Date().toISOString()
);

console.log('Database seeded successfully with test project.');
