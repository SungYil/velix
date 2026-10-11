import path from 'path';
import fs from 'fs';

function getProjectRoot() {
  let current = process.cwd();
  while (current && current !== path.parse(current).root) {
    if (fs.existsSync(path.join(current, 'package.json'))) {
      return current;
    }
    current = path.dirname(current);
  }
  return process.cwd();
}

function getJsonStorePath() {
  const rootDir = getProjectRoot();
  const dataDir = path.join(rootDir, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    try { fs.chmodSync(dataDir, 0o777); } catch {}
  }
  const filePath = path.join(dataDir, 'velix_store.json');
  if (!fs.existsSync(filePath)) {
    const initialData = {
      creator_applications: [],
      business_inquiries: [],
      agent_applications: [],
      insights: [
        {
          id: 1,
          title: '2026 라이브 크리에이터 MCN 트렌드 보고서',
          category: '트렌드',
          excerpt: '1인 미디어 시장의 급성장과 숏폼 커머스 결합 전략에 대한 심층 분석',
          content: '2026년 라이브 스트리밍 시장은 숏폼 커머스와 결합하며 크리에이터의 브랜딩 가치가 그 어느 때보다 중요해졌습니다. 벨릭스미디어는 스튜디오 인프라와 1:1 멘토링을 통해 크리에이터의 지속 가능한 성장을 지원합니다.',
          thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: '초보 스트리머를 위한 방송 스튜디오 세팅 가이드',
          category: '가이드',
          excerpt: '조명, 마이크, 캠 세팅부터 방음 시설까지 한 눈에 알아보는 팁',
          content: '고화질 스트리밍을 위해서는 적절한 조명 배치와 4K 캠 세팅이 필수입니다. 본사 전용 스튜디오에서 제공하는 방송 기자를 활용해 보시는 것을 추천합니다.',
          thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
          created_at: new Date().toISOString(),
        },
      ],
      notices: [
        {
          id: 1,
          title: 'VelixMEDIA 소속 크리에이터 공채 1기 모집 안내',
          content: '차세대 1인 미디어를 함께 이끌어갈 참신하고 열정적인 크리에이터 / BJ를 찾습니다. 최신 장비 및 스튜디오 풀지원!',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: '본사 통합 스튜디오 리노베이션 완공 안내',
          content: '강남 본사 스튜디오 12개 전용관의 방음 및 최고사양 PC / 조명 시스템 리노베이션이 완성되었습니다.',
          created_at: new Date().toISOString(),
        },
      ],
      faqs: [
        {
          id: 1,
          question: '방송 경험이 없는 초보도 크리에이터 지원이 가능한가요?',
          answer: '네, 가능합니다! 벨릭스미디어는 1:1 맞춤형 전담 매니저 케어를 통해 기초 세팅부터 방송 기획까지 단계별로 교육 지원해 드립니다.',
          category: '지원관련',
          order_index: 1,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          question: '개인 스튜디오나 개인 방송 장비가 없어도 되나요?',
          answer: '네! 본사 내 무상 이용 가능한 12개 전용 방음 스튜디오 및 고성능 PC/카메라/조명 장비 세트를 전폭 지원해 드립니다.',
          category: '장비관련',
          order_index: 2,
          created_at: new Date().toISOString(),
        },
      ],
      creators: [
        {
          id: 1,
          name: '민우',
          stage_name: 'MINWOO',
          category: '토크 & 라이프스타일',
          platform: 'SOOP / 틱톡',
          tag: '#보이는라디오 #소통',
          image: '/creators/creator1.jpg',
          description: '스마트한 매력과 진솔한 입담으로 시청자들과 실시간으로 소통하는 VELIX 대표 남성 라이브 호스트',
          display_order: 1,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: '루아',
          stage_name: 'LUA',
          category: '보이는 라디오 & 버라이어티',
          platform: '틱톡 / 라이브',
          tag: '#엔터테인먼트 #토크',
          image: '/creators/creator2.jpg',
          description: '톡톡 튀는 사랑스러운 에너지와 다채로운 콘텐츠로 팬들의 뜨거운 사랑을 받는 비주얼 크리에이터',
          display_order: 2,
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: '서아',
          stage_name: 'SEOA',
          category: '토크 & 뷰티 라이프',
          platform: 'SOOP / 인스타그램',
          tag: '#소통 #글로벌팬덤',
          image: '/creators/creator3.jpg',
          description: '우아한 무드와 흡입력 있는 진행으로 폭넓은 국내외 팬덤을 구축한 정상급 라이브 스트리머',
          display_order: 3,
          created_at: new Date().toISOString(),
        },
        {
          id: 4,
          name: '다은',
          stage_name: 'DAEUN',
          category: '음악 & 힐링 소통',
          platform: '틱톡 / 유튜브',
          tag: '#감성라이브 #음악방송',
          image: '/creators/creator4.jpg',
          description: '청순한 비주얼과 따뜻한 감성 보이스로 시청자들의 일상에 힐링을 선사하는 라이브 아티스트',
          display_order: 4,
          created_at: new Date().toISOString(),
        },
        {
          id: 5,
          name: '지우',
          stage_name: 'JIWOO',
          category: '일상 소통 & 야외 라이브',
          platform: 'SOOP / 틱톡',
          tag: '#일상Vlog #실시간소통',
          image: '/creators/creator5.jpg',
          description: '꾸밈없는 친근한 매력과 자연스러운 소통으로 강력한 팬층을 이끌어가는 라이징 스트리머',
          display_order: 5,
          created_at: new Date().toISOString(),
        },
      ],
    };
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), 'utf-8');
    try { fs.chmodSync(filePath, 0o777); } catch {}
  }
  return filePath;
}

function readJsonStore() {
  try {
    const filePath = getJsonStorePath();
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.agent_applications) parsed.agent_applications = [];
    if (!parsed.creators || parsed.creators.length === 0) {
      parsed.creators = [
        {
          id: 1, name: '민우', stage_name: 'MINWOO', category: '토크 & 라이프스타일', platform: 'SOOP / 틱톡',
          tag: '#보이는라디오 #소통', image: '/creators/creator1.jpg',
          description: '스마트한 매력과 진솔한 입담으로 시청자들과 실시간으로 소통하는 VELIX 대표 남성 라이브 호스트', display_order: 1, created_at: new Date().toISOString()
        },
        {
          id: 2, name: '루아', stage_name: 'LUA', category: '보이는 라디오 & 버라이어티', platform: '틱톡 / 라이브',
          tag: '#엔터테인먼트 #토크', image: '/creators/creator2.jpg',
          description: '톡톡 튀는 사랑스러운 에너지와 다채로운 콘텐츠로 팬들의 뜨거운 사랑을 받는 비주얼 크리에이터', display_order: 2, created_at: new Date().toISOString()
        },
        {
          id: 3, name: '서아', stage_name: 'SEOA', category: '토크 & 뷰티 라이프', platform: 'SOOP / 인스타그램',
          tag: '#소통 #글로벌팬덤', image: '/creators/creator3.jpg',
          description: '우아한 무드와 흡입력 있는 진행으로 폭넓은 국내외 팬덤을 구축한 정상급 라이브 스트리머', display_order: 3, created_at: new Date().toISOString()
        },
        {
          id: 4, name: '다은', stage_name: 'DAEUN', category: '음악 & 힐링 소통', platform: '틱톡 / 유튜브',
          tag: '#감성라이브 #음악방송', image: '/creators/creator4.jpg',
          description: '청순한 비주얼과 따뜻한 감성 보이스로 시청자들의 일상에 힐링을 선사하는 라이브 아티스트', display_order: 4, created_at: new Date().toISOString()
        },
        {
          id: 5, name: '지우', stage_name: 'JIWOO', category: '일상 소통 & 야외 라이브', platform: 'SOOP / 틱톡',
          tag: '#일상Vlog #실시간소통', image: '/creators/creator5.jpg',
          description: '꾸밈없는 친근한 매력과 자연스러운 소통으로 강력한 팬층을 이끌어가는 라이징 스트리머', display_order: 5, created_at: new Date().toISOString()
        },
      ];
      writeJsonStore(parsed);
    }
    if (parsed.creators) {
      parsed.creators = parsed.creators.map((c: any) => ({
        ...c,
        link_url: c.link_url || '',
      }));
    }
    return parsed;
  } catch {
    return { creator_applications: [], business_inquiries: [], agent_applications: [], insights: [], notices: [], faqs: [], creators: [] };
  }
}

function writeJsonStore(store: any) {
  try {
    const filePath = getJsonStorePath();
    fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf-8');
    try { fs.chmodSync(filePath, 0o777); } catch {}
  } catch (e) {
    console.error('Error writing JSON store:', e);
  }
}

// SQLite Database Handlers
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
      file_url TEXT, file_name TEXT, files_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS business_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL,
      birthdate TEXT, residence TEXT, sns TEXT, bio TEXT,
      file_url TEXT, file_name TEXT, files_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS agent_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, gender TEXT, phone TEXT NOT NULL, email TEXT NOT NULL,
      residence TEXT, sns TEXT, bio TEXT,
      file_url TEXT, file_name TEXT, files_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
    CREATE TABLE IF NOT EXISTS creators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, stage_name TEXT, category TEXT, platform TEXT, tag TEXT,
      image TEXT NOT NULL, description TEXT, display_order INTEGER DEFAULT 0,
      link_url TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  try { sqliteDb.exec(`ALTER TABLE creator_applications ADD COLUMN files_json TEXT;`); } catch {}
  try { sqliteDb.exec(`ALTER TABLE business_inquiries ADD COLUMN files_json TEXT;`); } catch {}
  try { sqliteDb.exec(`ALTER TABLE agent_applications ADD COLUMN files_json TEXT;`); } catch {}
  try { sqliteDb.exec(`ALTER TABLE creators ADD COLUMN link_url TEXT DEFAULT '';`); } catch {}

  // Seed default creators into SQLite if empty
  try {
    const creatorCount = sqliteDb.prepare(`SELECT COUNT(*) as count FROM creators`).get();
    if (!creatorCount || creatorCount.count === 0) {
      const insertCreator = sqliteDb.prepare(`
        INSERT INTO creators (id, name, stage_name, category, platform, tag, image, description, display_order, link_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const defaultCreators = [
        [1, '민우', 'MINWOO', '토크 & 라이프스타일', 'SOOP / 틱톡', '#보이는라디오 #소통', '/creators/creator1.jpg', '스마트한 매력과 진솔한 입담으로 시청자들과 실시간으로 소통하는 VELIX 대표 남성 라이브 호스트', 1, ''],
        [2, '루아', 'LUA', '보이는 라디오 & 버라이어티', '틱톡 / 라이브', '#엔터테인먼트 #토크', '/creators/creator2.jpg', '톡톡 튀는 사랑스러운 에너지와 다채로운 콘텐츠로 팬들의 뜨거운 사랑을 받는 비주얼 크리에이터', 2, ''],
        [3, '서아', 'SEOA', '토크 & 뷰티 라이프', 'SOOP / 인스타그램', '#소통 #글로벌팬덤', '/creators/creator3.jpg', '우아한 무드와 흡입력 있는 진행으로 폭넓은 국내외 팬덤을 구축한 정상급 라이브 스트리머', 3, ''],
        [4, '다은', 'DAEUN', '음악 & 힐링 소통', '틱톡 / 유튜브', '#감성라이브 #음악방송', '/creators/creator4.jpg', '청순한 비주얼과 따뜻한 감성 보이스로 시청자들의 일상에 힐링을 선사하는 라이브 아티스트', 4, ''],
        [5, '지우', 'JIWOO', '일상 소통 & 야외 라이브', 'SOOP / 틱톡', '#일상Vlog #실시간소통', '/creators/creator5.jpg', '꾸밈없는 친근한 매력과 자연스러운 소통으로 강력한 팬층을 이끌어가는 라이징 스트리머', 5, ''],
      ];
      for (const c of defaultCreators) {
        insertCreator.run(...c);
      }
    }
  } catch (err) {
    console.warn('Error seeding default creators into SQLite:', err);
  }
} catch (e) {
  console.warn('SQLite init failed, using JSON store fallback:', e);
  useSqlite = false;
}

const db = {
  prepare(sql: string) {
    if (useSqlite && sqliteDb) {
      try {
        const stmt = sqliteDb.prepare(sql);
        return {
          run(...args: any[]) {
            const res = stmt.run(...args);
            // Sync to JSON store as backup
            try {
              const store = readJsonStore();
              const now = new Date().toISOString();
              if (sql.includes('creator_applications')) {
                store.creator_applications.push({
                  id: res.lastInsertRowid, name: args[0], gender: args[1], phone: args[2], email: args[3],
                  birthdate: args[4], residence: args[5], sns: args[6], has_studio: args[7],
                  bio: args[8], file_url: args[9], file_name: args[10], files_json: args[11] || null, created_at: now
                });
              } else if (sql.includes('business_inquiries')) {
                store.business_inquiries.push({
                  id: res.lastInsertRowid, name: args[0], email: args[1], phone: args[2], birthdate: args[3],
                  residence: args[4], sns: args[5], bio: args[6], file_url: args[7], file_name: args[8], files_json: args[9] || null, created_at: now
                });
              } else if (sql.includes('agent_applications')) {
                store.agent_applications.push({
                  id: res.lastInsertRowid, name: args[0], gender: args[1], phone: args[2], email: args[3],
                  residence: args[4], sns: args[5], bio: args[6], file_url: args[7], file_name: args[8], files_json: args[9] || null, created_at: now
                });
              } else if (sql.includes('creators')) {
                store.creators.push({
                  id: res.lastInsertRowid, name: args[0], stage_name: args[1], category: args[2],
                  platform: args[3], tag: args[4], image: args[5], description: args[6],
                  display_order: args[7] || 0, link_url: args[8] || '', created_at: now
                });
              }
              if (sql.includes('DELETE FROM')) {
                const targetId = args[0];
                if (sql.includes('creator_applications')) store.creator_applications = store.creator_applications.filter((c: any) => String(c.id) !== String(targetId));
                if (sql.includes('business_inquiries')) store.business_inquiries = store.business_inquiries.filter((b: any) => String(b.id) !== String(targetId));
                if (sql.includes('agent_applications')) store.agent_applications = store.agent_applications.filter((a: any) => String(a.id) !== String(targetId));
                if (sql.includes('insights')) store.insights = store.insights.filter((i: any) => String(i.id) !== String(targetId));
                if (sql.includes('notices')) store.notices = store.notices.filter((n: any) => String(n.id) !== String(targetId));
                if (sql.includes('faqs')) store.faqs = store.faqs.filter((f: any) => String(f.id) !== String(targetId));
                if (sql.includes('creators')) store.creators = store.creators.filter((c: any) => String(c.id) !== String(targetId));
              }
              writeJsonStore(store);
            } catch {}
            return res;
          },
          get(...args: any[]) {
            return stmt.get(...args);
          },
          all(...args: any[]) {
            return stmt.all(...args);
          }
        };
      } catch (err: any) {
        console.warn('SQLite prepare error, falling back to JSON store:', err.message);
      }
    }

    // Pure JSON Store Fallback
    return {
      run(...args: any[]) {
        const store = readJsonStore();
        const now = new Date().toISOString();
        const lastId = Date.now();

        if (sql.includes('creator_applications')) {
          store.creator_applications.push({
            id: lastId, name: args[0], gender: args[1], phone: args[2], email: args[3],
            birthdate: args[4], residence: args[5], sns: args[6], has_studio: args[7],
            bio: args[8], file_url: args[9], file_name: args[10], files_json: args[11] || null, created_at: now
          });
        } else if (sql.includes('business_inquiries')) {
          store.business_inquiries.push({
            id: lastId, name: args[0], email: args[1], phone: args[2], birthdate: args[3],
            residence: args[4], sns: args[5], bio: args[6], file_url: args[7], file_name: args[8], files_json: args[9] || null, created_at: now
          });
        } else if (sql.includes('agent_applications')) {
          store.agent_applications.push({
            id: lastId, name: args[0], gender: args[1], phone: args[2], email: args[3],
            residence: args[4], sns: args[5], bio: args[6], file_url: args[7], file_name: args[8], files_json: args[9] || null, created_at: now
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
        } else if (sql.includes('creators')) {
          store.creators.push({
            id: lastId, name: args[0], stage_name: args[1], category: args[2],
            platform: args[3], tag: args[4], image: args[5], description: args[6],
            display_order: args[7] || 0, link_url: args[8] || '', created_at: now
          });
        } else if (sql.includes('DELETE FROM')) {
          const targetId = args[0];
          if (sql.includes('creator_applications')) store.creator_applications = store.creator_applications.filter((c: any) => String(c.id) !== String(targetId));
          if (sql.includes('business_inquiries')) store.business_inquiries = store.business_inquiries.filter((b: any) => String(b.id) !== String(targetId));
          if (sql.includes('agent_applications')) store.agent_applications = store.agent_applications.filter((a: any) => String(a.id) !== String(targetId));
          if (sql.includes('insights')) store.insights = store.insights.filter((i: any) => String(i.id) !== String(targetId));
          if (sql.includes('notices')) store.notices = store.notices.filter((n: any) => String(n.id) !== String(targetId));
          if (sql.includes('faqs')) store.faqs = store.faqs.filter((f: any) => String(f.id) !== String(targetId));
          if (sql.includes('creators')) store.creators = store.creators.filter((c: any) => String(c.id) !== String(targetId));
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
          if (sql.includes('creators')) return { count: store.creators.length };
        }
        return null;
      },
      all(...args: any[]) {
        const store = readJsonStore();
        if (sql.includes('creator_applications')) return store.creator_applications;
        if (sql.includes('business_inquiries')) return store.business_inquiries;
        if (sql.includes('agent_applications')) return store.agent_applications;
        if (sql.includes('insights')) return store.insights;
        if (sql.includes('notices')) return store.notices;
        if (sql.includes('faqs')) return store.faqs;
        if (sql.includes('creators')) return store.creators;
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
