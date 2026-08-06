import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const notices = db.prepare(`
      SELECT * FROM notices ORDER BY created_at DESC
    `).all();

    return NextResponse.json({ notices });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
