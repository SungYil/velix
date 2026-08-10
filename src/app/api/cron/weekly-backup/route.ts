import { NextRequest, NextResponse } from 'next/server';
import { uploadDbBackupToS3 } from '@/lib/s3';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const result = await uploadDbBackupToS3();
    return NextResponse.json({ mode: 'weekly', ...result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
