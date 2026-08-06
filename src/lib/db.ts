import path from 'path';
import fs from 'fs';

function getProjectRoot() {
  const cwd = process.cwd();
  if (cwd.includes('.next/standalone')) {
    return path.resolve(cwd.split('.next/standalone')[0]);
  }
  return cwd;
}

function getJsonStorePath() {
  const rootDir = getProjectRoot();
  const dataDir = path.join(rootDir, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    try { fs.chmodSync(dataDir, 0o777); } catch {}
  }
  return path.join(dataDir, 'velix_store.json');
}

function readJsonStore() {
  const filePath = getJsonStorePath();
  if (!fs.existsSync(filePath)) {
    const initialData = {
      creator_applications: [],
      business_inquiries: [],
      insights: [
        {
          id: 1,
          title: 'VelixENT 크리에이터 미디어 트렌드 2026',
          category: '트렌드',
          excerpt: '글로벌 미디어 플랫폼에서 숏폼과 라이브 스트리밍 크리에이터가 도약하는 전략을 제시합니다.',
          content: '2026년 차세대 라이브 커머스와 숏폼 미디어 플랫폼에서 크리에이터의 성장 방정식은 데이터 기반 브랜딩입니다. VelixENT는 독자적인 데이터 분석 AI 솔루션 및 타깃 타깃팅 전략을 통해 차별화된 MCN 환경을 제공합니다.',
          thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: '성공적인 크리에이터 퍼스널 브랜딩 가이드',
          category: '브랜딩',
          excerpt: '나만의 개성을 무기로 10만 구독자 팬덤을 구축하는 3가지 필살기.',
          content: '콘텐츠 시장에서 본인만의 스토리텔링과 비주얼 정체성은 필수적입니다. VelixENT 스튜디오 멘토링 프로그램과 함께 개개인의 매력을 극대화하세요.',
          thumbnail: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80',
          created_at: new Date().toISOString()
        }
      ],
      notices: [
        {
          id: 1,
          title: '[공지] 2026년 하반기 VelixENT 신규 크리에이터 공채 전형 안내',
          content: '안녕하세요, VelixENT입니다. 2026년 하반기 신규 크리에이터 및 BJ 공채 모집이 시작되었습니다. 차세대 스타로 성장할 인재분들의 많은 지원 바랍니다.',
          created_at: new Date().toISOString()
        }
      ],
      faqs: [
        {
          id: 1,
          question: 'VelixENT 크리에이터 지원 자격은 어떻게 되나요?',
          answer: '열정과 개성을 갖춘 누구나 지원 가능합니다! 초보 크리에이터부터 기존 방송 진행자분들까지 모두 환영하며, 장비 지원 및 1:1 맞춤 교육 프로그램이 제공됩니다.',
          category: '지원관련',
          order_index: 1,
          created_at: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    try { fs.chmodSync(filePath, 0o777); } catch {}
    return initialData;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { creator_applications: [], business_inquiries: [], insights: [], notices: [], faqs: [] };
  }
}

function writeJsonStore(data: any) {
  const filePath = getJsonStorePath();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  try { fs.chmodSync(filePath, 0o777); } catch {}
}

let sqliteDb: any = null;
let useSqlite = true;

try {
  const Database = require('better-sqlite3');
  const rootDir = getProjectRoot();
  const dataDir = path.join(rootDir, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    try { fs.chmodSync(dataDir, 0o777); } catch {}
  }
  const dbPath = path.join(dataDir, 'velix.db');
  sqliteDb = new Database(dbPath);
  try { fs.chmodSync(dbPath, 0o777); } catch {}
  sqliteDb.pragma('journal_mode = WAL');
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS creator_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, gender TEXT, phone TEXT NOT NULL, email TEXT NOT NULL,
      birthdate TEXT, residence TEXT, sns TEXT, has_studio TEXT, bio TEXT,
      file_url TEXT, file_name TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS business_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL,
      birthdate TEXT, residence TEXT, sns TEXT, bio TEXT,
      file_url TEXT, file_name TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS insights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL, category TEXT DEFAULT 'INSIGHT', excerpt TEXT,
      content TEXT NOT NULL, thumbnail TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS notices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL, content TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL, answer TEXT NOT NULL, category TEXT DEFAULT '일반',
      order_index INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
} catch (e) {
  console.warn('SQLite init failed, using JSON store fallback:', e);
  useSqlite = false;
}

const db = {
  prepare(sql: string) {
    if (useSqlite && sqliteDb) {
      try {
        return sqliteDb.prepare(sql);
      } catch (err) {
        console.warn('SQLite prepare error, switching to JSON fallback:', err);
      }
    }
    // Fallback Mock Statement for JSON store
    return {
      run(...args: any[]) {
        const store = readJsonStore();
        const now = new Date().toISOString();
        let lastId = Date.now();

        if (sql.includes('creator_applications')) {
          store.creator_applications.push({
            id: lastId, name: args[0], gender: args[1], phone: args[2], email: args[3],
            birthdate: args[4], residence: args[5], sns: args[6], has_studio: args[7],
            bio: args[8], file_url: args[9], file_name: args[10], created_at: now
          });
        } else if (sql.includes('business_inquiries')) {
          store.business_inquiries.push({
            id: lastId, name: args[0], email: args[1], phone: args[2], birthdate: args[3],
            residence: args[4], sns: args[5], bio: args[6], file_url: args[7], file_name: args[8], created_at: now
          });
        } else if (sql.includes('insights')) {
          store.insights.unshift({
            id: lastId, title: args[0], category: args[1], excerpt: args[2], content: args[3], thumbnail: args[4], created_at: now
          });
        } else if (sql.includes('notices')) {
          store.notices.unshift({
            id: lastId, title: args[0], content: args[1], created_at: now
          });
        } else if (sql.includes('faqs')) {
          store.faqs.push({
            id: lastId, question: args[0], answer: args[1], category: args[2], order_index: args[3], created_at: now
          });
        } else if (sql.includes('DELETE FROM')) {
          const targetId = args[0];
          if (sql.includes('insights')) store.insights = store.insights.filter((i: any) => i.id !== targetId);
          if (sql.includes('notices')) store.notices = store.notices.filter((n: any) => n.id !== targetId);
          if (sql.includes('faqs')) store.faqs = store.faqs.filter((f: any) => f.id !== targetId);
        }

        writeJsonStore(store);
        return { lastInsertRowid: lastId };
      },
      get(...args: any[]) {
        const store = readJsonStore();
        if (sql.includes('SELECT COUNT(*)')) {
          if (sql.includes('insights')) return { count: store.insights.length };
          if (sql.includes('notices')) return { count: store.notices.length };
          if (sql.includes('faqs')) return { count: store.faqs.length };
        }
        return null;
      },
      all(...args: any[]) {
        const store = readJsonStore();
        if (sql.includes('creator_applications')) return store.creator_applications;
        if (sql.includes('business_inquiries')) return store.business_inquiries;
        if (sql.includes('insights')) return store.insights;
        if (sql.includes('notices')) return store.notices;
        if (sql.includes('faqs')) return store.faqs;
        return [];
      }
    };
  },
  exec(sql: string) {
    if (useSqlite && sqliteDb) {
      try { return sqliteDb.exec(sql); } catch {}
    }
  },
  pragma(sql: string) {
    if (useSqlite && sqliteDb) {
      try { return sqliteDb.pragma(sql); } catch {}
    }
  }
} as any;

export default db;
