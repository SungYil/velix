import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { uploadFileToStorage } from '@/lib/s3';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const gender = formData.get('gender') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const residence = formData.get('residence') as string;
    const sns = formData.get('sns') as string;
    const bio = formData.get('bio') as string;
    
    // Support multiple files (photos, videos, portfolios)
    const rawFiles = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;
    
    const allFiles: File[] = [];
    if (rawFiles && rawFiles.length > 0) {
      allFiles.push(...rawFiles.filter(f => f && f.size > 0));
    }
    if (singleFile && singleFile.size > 0 && !allFiles.some(f => f.name === singleFile.name)) {
      allFiles.push(singleFile);
    }

    if (!name || !phone || !email) {
      return NextResponse.json({ error: '필수 항목(이름, 연락처, 이메일)을 작성해주세요.' }, { status: 400 });
    }

    const filesList: Array<{ url: string; name: string; type: string }> = [];

    for (const file of allFiles) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const prefix = file.type.startsWith('video/') ? 'agent_video' : 'agent_file';
        const uploadRes = await uploadFileToStorage(buffer, file.name, file.type, prefix);
        filesList.push({
          url: uploadRes.fileUrl,
          name: uploadRes.fileName,
          type: file.type,
        });
      } catch (err: any) {
        console.error(`Error uploading agent application file ${file.name}:`, err);
      }
    }

    const firstFile = filesList[0] || { url: '', name: '' };
    const filesJson = JSON.stringify(filesList);

    let result: any;
    try {
      const stmt = db.prepare(`
        INSERT INTO agent_applications (name, gender, phone, email, residence, sns, bio, file_url, file_name, files_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      result = stmt.run(
        name,
        gender || '',
        phone,
        email,
        residence || '',
        sns || '',
        bio || '',
        firstFile.url,
        firstFile.name,
        filesJson
      );
    } catch (dbErr: any) {
      console.warn('10-column insert failed for agent_applications, falling back to 9-column insert:', dbErr.message);
      const stmtFallback = db.prepare(`
        INSERT INTO agent_applications (name, gender, phone, email, residence, sns, bio, file_url, file_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      result = stmtFallback.run(
        name,
        gender || '',
        phone,
        email,
        residence || '',
        sns || '',
        bio || '',
        filesJson.length > 2 ? filesJson : firstFile.url,
        firstFile.name
      );
    }

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    console.error('Agent application submission error:', error);
    return NextResponse.json({ error: error.message || '에이전트 지원서 제출 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
