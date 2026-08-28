import { NextResponse } from 'next/server';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
    }

    const result = await db.select().from(projects).where(eq(projects.clientToken, token)).limit(1);
    const project = result[0];

    if (!project) {
      return NextResponse.json({ error: 'Invalid or expired access token' }, { status: 401 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Token validation failed', details: error.message }, { status: 500 });
  }
}
