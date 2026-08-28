import crypto from "crypto";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { sendProjectPortalEmail } from "@/utils/emailDispatcher";

export async function POST(request) {
  try {
    const body = await request.json();
    const { clientName, clientEmail, currentPhase = "Initial Setup", progress = 10, cureStatus = "Normal Curing" } = body;

    if (!clientName || !clientEmail) {
      return NextResponse.json({ success: false, error: "Client name and email are required." }, { status: 400 });
    }

    const clientToken = crypto.randomBytes(32).toString("hex");

    const insertResult = await db.safeInsert(projects, {
      clientName,
      clientEmail,
      clientToken,
      currentPhase,
      progress,
      cureStatus,
    });

    if (insertResult && insertResult.success === false && insertResult.queued) {
      console.warn("[API WARNING] Database offline. Project write queued locally.");
    }

    await sendProjectPortalEmail({
      clientEmail,
      clientName,
      projectId: "PENDING_SYNC",
      clientToken,
    });

    return NextResponse.json({
      success: true,
      clientToken,
      portalUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard?token=${clientToken}`
    });

  } catch (error) {
    console.error("API Error creating project:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
