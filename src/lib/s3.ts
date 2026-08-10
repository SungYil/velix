import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs';

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

export async function uploadFileToStorage(
  fileBuffer: Buffer,
  originalFilename: string,
  contentType: string,
  prefix: string = 'uploads'
): Promise<{ fileUrl: string; fileName: string }> {
  const fileExt = path.extname(originalFilename) || '';
  const uniqueName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${fileExt}`;

  // If S3 bucket and credentials are provided, upload to AWS S3
  if (s3Client && bucketName) {
    try {
      const s3Key = `${prefix}/${uniqueName}`;
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: contentType || 'application/octet-stream',
      });

      await s3Client.send(command);

      // Return proxy API URL to avoid S3 bucket public access blocks or AccessDenied errors
      const fileUrl = `/api/files?key=${encodeURIComponent(s3Key)}`;
      return { fileUrl, fileName: originalFilename };
    } catch (err: any) {
      console.error('AWS S3 Upload Error, falling back to local storage:', err);
    }
  }

  // Fallback to Local Storage
  const rootDir = getProjectRoot();
  const uploadsDir = path.join(rootDir, 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, uniqueName);
  fs.writeFileSync(filePath, fileBuffer);

  return { fileUrl: `/uploads/${uniqueName}`, fileName: originalFilename };
}

// Automatic / Manual DB Backup to AWS S3
export async function uploadDbBackupToS3(): Promise<{ success: boolean; backups: string[]; message: string }> {
  const rootDir = getProjectRoot();
  const dataDir = path.join(rootDir, 'data');
  const dbFile = path.join(dataDir, 'velix.db');
  const jsonFile = path.join(dataDir, 'velix_store.json');

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const uploadedKeys: string[] = [];

  if (s3Client && bucketName) {
    try {
      if (fs.existsSync(dbFile)) {
        const dbBuffer = fs.readFileSync(dbFile);
        const s3Key = `backups/velix_${timestamp}.db`;
        await s3Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
            Body: dbBuffer,
            ContentType: 'application/x-sqlite3',
          })
        );
        uploadedKeys.push(s3Key);
      }

      if (fs.existsSync(jsonFile)) {
        const jsonBuffer = fs.readFileSync(jsonFile);
        const s3Key = `backups/velix_store_${timestamp}.json`;
        await s3Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
            Body: jsonBuffer,
            ContentType: 'application/json',
          })
        );
        uploadedKeys.push(s3Key);
      }

      return {
        success: true,
        backups: uploadedKeys,
        message: `S3 DB 백업 완료: ${uploadedKeys.length}개 파일 업로드됨 (${timestamp})`,
      };
    } catch (err: any) {
      console.error('S3 DB Backup Error:', err);
      return { success: false, backups: [], message: `S3 백업 중 오류 발생: ${err.message}` };
    }
  }

  return { success: false, backups: [], message: 'S3 클라이언트 또는 버킷 설정이 존재하지 않습니다.' };
}
