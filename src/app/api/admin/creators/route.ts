import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { uploadFileToStorage } from '@/lib/s3';

export const dynamic = 'force-dynamic';

function isAuthenticated(req: NextRequest) {
  const authCookie = req.cookies.get('velix_admin_auth');
  return authCookie && authCookie.value === 'authenticated_token_velix_2026';
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '관리자 권한이 없습니다.' }, { status: 401 });
  }

  try {
    const creators = db.prepare(`SELECT * FROM creators ORDER BY display_order ASC, id DESC`).all();
    return NextResponse.json({ creators: creators || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '관리자 로그인 권한이 필요합니다.' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const stageName = (formData.get('stage_name') || formData.get('stageName') || '') as string;
    const category = (formData.get('category') || '토크 & 소통') as string;
    const platform = (formData.get('platform') || 'SOOP / 틱톡') as string;
    const tag = (formData.get('tag') || '#라이브 #호스트') as string;
    const description = (formData.get('description') || '') as string;
    const displayOrder = parseInt((formData.get('display_order') || '0') as string, 10);
    const linkUrl = (formData.get('link_url') || formData.get('linkUrl') || '') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrlInput = (formData.get('imageUrl') || '') as string;

    if (!name) {
      return NextResponse.json({ error: '호스트/크리에이터 이름을 입력해주세요.' }, { status: 400 });
    }

    let image = imageUrlInput;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await uploadFileToStorage(buffer, imageFile.name, imageFile.type, 'creator');
      image = uploadRes.fileUrl;
    }

    if (!image) {
      image = '/creators/creator1.jpg';
    }

    const stmt = db.prepare(`
      INSERT INTO creators (name, stage_name, category, platform, tag, image, description, display_order, link_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, stageName, category, platform, tag, image, description, displayOrder, linkUrl);

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '관리자 권한이 없습니다.' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const stageName = (formData.get('stage_name') || formData.get('stageName') || '') as string;
    const category = (formData.get('category') || '토크 & 소통') as string;
    const platform = (formData.get('platform') || 'SOOP / 틱톡') as string;
    const tag = (formData.get('tag') || '#라이브 #호스트') as string;
    const description = (formData.get('description') || '') as string;
    const displayOrder = parseInt((formData.get('display_order') || '0') as string, 10);
    const linkUrl = (formData.get('link_url') || formData.get('linkUrl') || '') as string;
    const imageFile = formData.get('image') as File | null;
    const existingImage = (formData.get('existingImage') || '') as string;

    if (!id || !name) {
      return NextResponse.json({ error: '수정할 호스트 ID와 이름이 필요합니다.' }, { status: 400 });
    }

    let image = existingImage;

    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await uploadFileToStorage(buffer, imageFile.name, imageFile.type, 'creator');
      image = uploadRes.fileUrl;
    }

    if (!image) {
      image = '/creators/creator1.jpg';
    }

    const stmt = db.prepare(`
      UPDATE creators
      SET name = ?, stage_name = ?, category = ?, platform = ?, tag = ?, image = ?, description = ?, display_order = ?, link_url = ?
      WHERE id = ?
    `);

    stmt.run(name, stageName, category, platform, tag, image, description, displayOrder, linkUrl, id);

    return NextResponse.json({ success: true, message: '호스트 정보가 수정되었습니다.' });
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
    if (!id) {
      return NextResponse.json({ error: '삭제할 호스트 ID가 유효하지 않습니다.' }, { status: 400 });
    }

    db.prepare('DELETE FROM creators WHERE id = ?').run(id);
    return NextResponse.json({ success: true, message: '호스트가 삭제되었습니다.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
