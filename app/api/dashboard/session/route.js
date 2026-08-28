import { NextResponse } from 'next/server';
// Adjust your database client import based on how api/ schema connects
// If using standard sqlite3 or better-sqlite3 in api folder:
import Database from 'better-sqlite3';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
    }

    // Connect to the database defined by schema.sql
    const dbPath = path.join(process.cwd(), 'api', 'database.sqlite');
    const db = new Database(dbPath, { readonly: true });

    const stmt = db.prepare('SELECT * FROM projects WHERE client_token = ?');
    const project = stmt.get(token);

    if (!project) {
      return NextResponse.json({ error: 'Invalid or expired access token' }, { status: 401 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Token validation failed', details: error.message }, { status: 500 });
  }
}
