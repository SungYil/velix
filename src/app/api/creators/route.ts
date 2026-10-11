import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    let creators = db.prepare(`SELECT * FROM creators ORDER BY display_order ASC, id ASC`).all();
    if (!creators || creators.length === 0) {
      creators = [];
    }
    return NextResponse.json({ creators });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '호스트 목록 조회 실패', creators: [] }, { status: 500 });
  }
}
