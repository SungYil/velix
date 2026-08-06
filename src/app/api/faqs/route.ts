import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const faqs = db.prepare(`
      SELECT * FROM faqs ORDER BY order_index ASC, created_at DESC
    `).all();

    return NextResponse.json({ faqs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
