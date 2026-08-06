import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '4', 10);
    const offset = (page - 1) * limit;

    const insights = db.prepare(`
      SELECT * FROM insights ORDER BY created_at DESC LIMIT ? OFFSET ?
    `).all(limit, offset);

    const totalCount = (db.prepare('SELECT COUNT(*) as count FROM insights').get() as { count: number }).count;
    const hasMore = offset + insights.length < totalCount;

    return NextResponse.json({
      insights,
      totalCount,
      hasMore,
      page
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
