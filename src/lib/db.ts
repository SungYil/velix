import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let _db: Database.Database | null = null;

function getDbInstance(): Database.Database {
  if (!_db) {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = path.join(dataDir, 'velix.db');
    _db = new Database(dbPath);
    _db.pragma('journal_mode = WAL');

    // Initialize Tables
    _db.exec(`
      CREATE TABLE IF NOT EXISTS creator_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        gender TEXT,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        birthdate TEXT,
        residence TEXT,
        sns TEXT,
        has_studio TEXT,
        bio TEXT,
        file_url TEXT,
        file_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS business_inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        birthdate TEXT,
        residence TEXT,
        sns TEXT,
        bio TEXT,
        file_url TEXT,
        file_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS insights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT DEFAULT 'INSIGHT',
        excerpt TEXT,
        content TEXT NOT NULL,
        thumbnail TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS notices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS faqs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category TEXT DEFAULT '일반',
        order_index INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed initial data if empty
    const insightCount = (_db.prepare('SELECT COUNT(*) as count FROM insights').get() as { count: number }).count;
    if (insightCount === 0) {
      const insertInsight = _db.prepare(`
        INSERT INTO insights (title, category, excerpt, content, thumbnail)
        VALUES (?, ?, ?, ?, ?)
      `);

      insertInsight.run(
        'VelixENT 크리에이터 미디어 트렌드 2026',
        '트렌드',
        '글로벌 미디어 플랫폼에서 숏폼과 라이브 스트리밍 크리에이터가 도약하는 전략을 제시합니다.',
        '2026년 차세대 라이브 커머스와 숏폼 미디어 플랫폼에서 크리에이터의 성장 방정식은 데이터 기반 브랜딩입니다. VelixENT는 독자적인 데이터 분석 AI 솔루션 및 타깃 타깃팅 전략을 통해 차별화된 MCN 환경을 제공합니다.',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
      );

      insertInsight.run(
        '성공적인 크리에이터 퍼스널 브랜딩 가이드',
        '브랜딩',
        '나만의 개성을 무기로 10만 구독자 팬덤을 구축하는 3가지 필살기.',
        '콘텐츠 시장에서 본인만의 스토리텔링과 비주얼 정체성은 필수적입니다. VelixENT 스튜디오 멘토링 프로그램과 함께 개개인의 매력을 극대화하세요.',
        'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80'
      );

      insertInsight.run(
        '1인 방송 라이브 스튜디오 세팅의 모든 것',
        '장비/기술',
        '고화질 마이크와 조명 세팅부터 OBS 최적화 설정까지 한눈에 파악하세요.',
        '방송 품질 향상을 위한 조명, 마이크, 캡처보드 선택 가이드와 인터넷 환경 최적화 방안을 자세히 안내해 드립니다.',
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'
      );

      insertInsight.run(
        'MCN 차세대 컬래버레이션 비즈니스 모델',
        '비즈니스',
        '기업 커머스와 크리에이터 시너지의 대표적인 모범 사례 분석.',
        '브랜드 파트너십 구축 및 광고 협찬 전략을 통해 안정적인 수익 모델을 창출하는 방법을 알아봅니다.',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
      );
    }

    const noticeCount = (_db.prepare('SELECT COUNT(*) as count FROM notices').get() as { count: number }).count;
    if (noticeCount === 0) {
      const insertNotice = _db.prepare(`
        INSERT INTO notices (title, content)
        VALUES (?, ?)
      `);

      insertNotice.run(
        '[공지] 2026년 하반기 VelixENT 신규 크리에이터 공채 전형 안내',
        '안녕하세요, VelixENT입니다. 2026년 하반기 신규 크리에이터 및 BJ 공채 모집이 시작되었습니다. 차세대 스타로 성장할 인재분들의 많은 지원 바랍니다.'
      );

      insertNotice.run(
        '[안내] VelixENT 본사 스튜디오 리뉴얼 오픈 및 이용 지원',
        '소속 크리에이터분들의 방송 환경 향상을 위해 강남 본사 1/2 스튜디오 장비 및 방음 세팅이 완비되었습니다. 예약 시스템을 통해 자유롭게 이용 가능합니다.'
      );

      insertNotice.run(
        '[시스템] 서비스 점검 및 관리자 서버 점검 안내',
        '더욱 안정적인 서비스를 위하여 서버 정기 점검이 진행될 예정입니다. 문의사항은 대표번호 또는 카카오톡 상담을 이용해 주세요.'
      );
    }

    const faqCount = (_db.prepare('SELECT COUNT(*) as count FROM faqs').get() as { count: number }).count;
    if (faqCount === 0) {
      const insertFaq = _db.prepare(`
        INSERT INTO faqs (question, answer, category, order_index)
        VALUES (?, ?, ?, ?)
      `);

      insertFaq.run(
        'VelixENT 크리에이터 지원 자격은 어떻게 되나요?',
        '열정과 개성을 갖춘 누구나 지원 가능합니다! 초보 크리에이터부터 기존 방송 진행자분들까지 모두 환영하며, 장비 지원 및 1:1 맞춤 교육 프로그램이 제공됩니다.',
        '지원관련',
        1
      );

      insertFaq.run(
        '개인 스튜디오 및 방송 장비가 없어도 지원 가능한가요?',
        '네, 가능합니다. VelixENT는 본사 오프라인 스튜디오와 최신 방송 장비(캠, 마이크, 조명 등) 지원 혜택을 제공하고 있습니다.',
        '장비지원',
        2
      );

      insertFaq.run(
        '비즈니스 제휴 및 광고 문의는 처리 절차가 어떻게 되나요?',
        '사업영역 메뉴의 비즈니스 문의 폼을 통해 신청해 주시면, 24시간 이내 담당 매니저가 내용을 검토한 후 입력해주신 연락처로 상담 안내 연락을 드립니다.',
        '비즈니스',
        3
      );

      insertFaq.run(
        '계약 후 법률 및 정산 관련 지원도 받을 수 있나요?',
        'VelixENT는 전담 법률 자문단과 투명한 실시간 정산 시스템을 갖추고 있어 크리에이터가 콘텐츠에만 집중할 수 있는 환경을 보장합니다.',
        '계약/정산',
        4
      );
    }
  }
  return _db;
}

const db = new Proxy({} as Database.Database, {
  get(_target, prop: keyof Database.Database) {
    const instance = getDbInstance();
    const value = instance[prop];
    if (typeof value === 'function') {
      return (value as Function).bind(instance);
    }
    return value;
  }
});

export default db;
