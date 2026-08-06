import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import path from 'path';
import fs from 'fs';

function getProjectRoot() {
  const cwd = process.cwd();
  if (cwd.includes('.next/standalone')) {
    return path.resolve(cwd.split('.next/standalone')[0]);
  }
  return cwd;
}

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

      const rootDir = getProjectRoot();
      const uploadsDir = path.join(rootDir, 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileExt = path.extname(thumbnailFile.name) || '.jpg';
      const uniqueName = `insight_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${fileExt}`;
      const filePath = path.join(uploadsDir, uniqueName);

      fs.writeFileSync(filePath, buffer);
      thumbnail = `/uploads/${uniqueName}`;

      const standaloneUploads = path.join(process.cwd(), 'public', 'uploads');
      if (process.cwd().includes('.next/standalone') && !fs.existsSync(standaloneUploads)) {
        fs.mkdirSync(standaloneUploads, { recursive: true });
        fs.writeFileSync(path.join(standaloneUploads, uniqueName), buffer);
      }
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
