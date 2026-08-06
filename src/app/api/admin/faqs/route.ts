import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

function isAuthenticated(req: NextRequest) {
  const authCookie = req.cookies.get('velix_admin_auth');
  return authCookie && authCookie.value === 'authenticated_token_velix_2026';
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 401 });
  }

  try {
    const { question, answer, category } = await req.json();

    if (!question || !answer) {
      return NextResponse.json({ error: '질문과 답변을 모두 입력해주세요.' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO faqs (question, answer, category)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(question, answer, category || '일반');

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    db.prepare('DELETE FROM faqs WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
