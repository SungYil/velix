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

      const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`;
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

  // Copy to standalone public folder if running in standalone mode
  if (process.cwd().includes('.next/standalone')) {
    const standaloneUploads = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(standaloneUploads)) {
      fs.mkdirSync(standaloneUploads, { recursive: true });
    }
    fs.writeFileSync(path.join(standaloneUploads, uniqueName), fileBuffer);
  }

  return { fileUrl: `/uploads/${uniqueName}`, fileName: originalFilename };
}
