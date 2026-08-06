import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToStorage } from '@/lib/s3';

export const dynamic = 'force-dynamic';

function isAuthenticated(req: NextRequest) {
  const authCookie = req.cookies.get('velix_admin_auth');
  return authCookie && authCookie.value === 'authenticated_token_velix_2026';
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: '업로드할 파일이 없습니다.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const prefix = file.type.startsWith('video/') ? 'video' : 'image';

    const uploadRes = await uploadFileToStorage(buffer, file.name, file.type, prefix);

    return NextResponse.json({
      success: true,
      fileUrl: uploadRes.fileUrl,
      fileName: uploadRes.fileName,
      isVideo: file.type.startsWith('video/'),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
