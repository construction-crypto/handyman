
import Database from "better-sqlite3";
import path from "path";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { sendProjectPortalEmail } from "@/utils/emailDispatcher";

export async function POST(request) {
  try {
    const body = await request.json();
    const { clientName, clientEmail, currentPhase = "Initial Setup", progress = 10, cureStatus = "Normal Curing" } = body;

    if (!clientName || !clientEmail) {
      return NextResponse.json({ success: false, error: "Client name and email are required." }, { status: 400 });
    }

    // Generate secure cryptographic token locally
    const clientToken = crypto.randomBytes(32).toString("hex");

    const dbPath = path.join(process.cwd(), "api", "database.sqlite");
    const db = new Database(dbPath);

    // Ensure table exists
    db.prepare(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_name TEXT,
        client_email TEXT,
        client_token TEXT UNIQUE,
        current_phase TEXT,
        progress INTEGER,
        cure_status TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    const stmt = db.prepare(`
      INSERT INTO projects (client_name, client_email, client_token, current_phase, progress, cure_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(clientName, clientEmail, clientToken, currentPhase, progress, cureStatus);
    const projectId = info.lastInsertRowid;

    // Trigger email dispatcher
    await sendProjectPortalEmail({
      clientEmail,
      clientName,
      projectId,
      clientToken,
    });

    return NextResponse.json({
      success: true,
      projectId,
      clientToken,
      portalUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard?token=${clientToken}`
    });

  } catch (error) {
    console.error("API Error creating project:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

