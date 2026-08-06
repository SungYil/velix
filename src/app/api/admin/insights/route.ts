import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { uploadFileToStorage } from '@/lib/s3';

function isAuthenticated(req: NextRequest) {
  const authCookie = req.cookies.get('velix_admin_auth');
  return authCookie && authCookie.value === 'authenticated_token_velix_2026';
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '관리자 로그인 권한이 필요합니다. 다시 로그인해주세요.' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string || 'INSIGHT';
    const excerpt = formData.get('excerpt') as string || '';
    const content = formData.get('content') as string;
    const thumbnailFile = formData.get('thumbnail') as File | null;
    const thumbnailUrlInput = formData.get('thumbnailUrl') as string || '';

    if (!title || !content) {
      return NextResponse.json({ error: '제목과 내용을 모두 입력해주세요.' }, { status: 400 });
    }

    let thumbnail = thumbnailUrlInput;

    if (thumbnailFile && thumbnailFile.size > 0) {
      const bytes = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await uploadFileToStorage(buffer, thumbnailFile.name, thumbnailFile.type, 'insight');
      thumbnail = uploadRes.fileUrl;
    }

    if (!thumbnail) {
      thumbnail = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
    }

    const stmt = db.prepare(`
      INSERT INTO insights (title, category, excerpt, content, thumbnail)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(title, category, excerpt, content, thumbnail);

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '관리자 권한이 없습니다.' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    db.prepare('DELETE FROM insights WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
