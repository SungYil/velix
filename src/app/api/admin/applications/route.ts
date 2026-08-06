import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

function isAuthenticated(req: NextRequest) {
  const authCookie = req.cookies.get('velix_admin_auth');
  return authCookie && authCookie.value === 'authenticated_token_velix_2026';
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 401 });
  }

  try {
    const applications = db.prepare('SELECT * FROM creator_applications ORDER BY created_at DESC').all();
    return NextResponse.json({ applications });
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
    db.prepare('DELETE FROM creator_applications WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
