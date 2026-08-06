import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';

const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'ap-northeast-2';
const bucketName = process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME || '';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';

let s3Client: S3Client | null = null;
if (accessKeyId && secretAccessKey) {
  s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

function getProjectRoot() {
  const cwd = process.cwd();
  if (cwd.includes('.next/standalone')) {
    return path.resolve(cwd.split('.next/standalone')[0]);
  }
  return cwd;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let key = searchParams.get('key') || '';
  const download = searchParams.get('download') === 'true';
  const customFilename = searchParams.get('filename') || '';

  if (!key) {
    return new NextResponse('Missing key parameter', { status: 400 });
  }

  // Clean key parameter
  key = key.replace(/^\/+/, '');

  // 1. Attempt S3 Fetch if configured
  if (s3Client && bucketName) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      const response = await s3Client.send(command);
      if (response.Body) {
        const byteArray = await response.Body.transformToByteArray();
        const contentType = response.ContentType || 'application/octet-stream';
        const originalFilename = customFilename || path.basename(key);

        const headers: Record<string, string> = {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        };

        if (download) {
          headers['Content-Disposition'] = `attachment; filename="${encodeURIComponent(originalFilename)}"`;
        }

        return new NextResponse(Buffer.from(byteArray), { headers });
      }
    } catch (err: any) {
      console.warn(`S3 getObject failed for key ${key}, checking local fallback:`, err.message);
    }
  }

  // 2. Fallback to Local Storage File
  const rootDir = getProjectRoot();
  const filename = path.basename(key);
  const localPath = path.join(rootDir, 'public', 'uploads', filename);

  if (fs.existsSync(localPath)) {
    const fileBuffer = fs.readFileSync(localPath);
    const ext = path.extname(filename).toLowerCase();
    
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.mp4') contentType = 'video/mp4';
    else if (ext === '.webm') contentType = 'video/webm';
    else if (ext === '.pdf') contentType = 'application/pdf';

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    };

    if (download) {
      headers['Content-Disposition'] = `attachment; filename="${encodeURIComponent(customFilename || filename)}"`;
    }

    return new NextResponse(fileBuffer, { headers });
  }

  return new NextResponse('File not found', { status: 404 });
}
