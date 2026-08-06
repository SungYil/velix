import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { uploadFileToStorage } from '@/lib/s3';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const birthdate = formData.get('birthdate') as string;
    const residence = formData.get('residence') as string;
    const sns = formData.get('sns') as string;
    const bio = formData.get('bio') as string;
    const file = formData.get('file') as File | null;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: '필수 항목(이름, 이메일, 연락처)을 작성해주세요.' }, { status: 400 });
    }

    let fileUrl = '';
    let fileName = '';

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await uploadFileToStorage(buffer, file.name, file.type, 'business');
      fileUrl = uploadRes.fileUrl;
      fileName = uploadRes.fileName;
    }

    const stmt = db.prepare(`
      INSERT INTO business_inquiries (name, email, phone, birthdate, residence, sns, bio, file_url, file_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      email,
      phone,
      birthdate || '',
      residence || '',
      sns || '',
      bio || '',
      fileUrl,
      fileName
    );

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    console.error('Business inquiry error:', error);
    return NextResponse.json({ error: error.message || '제출 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
