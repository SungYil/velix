import path from 'path';
import fs from 'fs';

function getProjectRoot() {
  const cwd = process.cwd();
  if (cwd.includes('.next/standalone')) {
    return path.resolve(cwd.split('.next/standalone')[0]);
  }
  return cwd;
}

const DEFAULT_PASS = process.env.ADMIN_PASSWORD || 'velix1234';

export function getAdminPassword(): string {
  try {
    const rootDir = getProjectRoot();
    const filePath = path.join(rootDir, 'data', 'admin_password.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (data && data.password) return data.password;
    }
  } catch {}
  return DEFAULT_PASS;
}

export function setAdminPassword(newPassword: string): boolean {
  try {
    const rootDir = getProjectRoot();
    const dataDir = path.join(rootDir, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      try { fs.chmodSync(dataDir, 0o777); } catch {}
    }
    const filePath = path.join(dataDir, 'admin_password.json');
    fs.writeFileSync(filePath, JSON.stringify({ password: newPassword, updatedAt: new Date().toISOString() }, null, 2), 'utf-8');
    try { fs.chmodSync(filePath, 0o777); } catch {}
    return true;
  } catch (err) {
    console.error('Error saving new admin password:', err);
    return false;
  }
}
