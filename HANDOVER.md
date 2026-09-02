# 📘 VelixMEDIA 시스템 인수인계 및 유지보수 운용 백서 (Developer Handoff Guide)

본 문서는 **(주)벨릭스미디어 (VelixMEDIA) 공식 웹사이트 및 관리자 CMS 시스템**의 후임 개발자 / 유지보수 담당자를 위한 전체 아키텍처, 데이터베이스(DB) 접속 및 수정 방법, EC2 장애 복구 가이드 문서입니다.

---

## 1. 🏗️ 전체 아키텍처 및 테크 스택 (Architecture & Tech Stack)

| 구분 | 기술 / 스택 | 비고 및 목적 |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16.3.0 (App Router)** | React 19 기반 SSR/SSG 혼합 아키텍처 |
| **Language** | **TypeScript 5.x** | 엄격한 타입 체크 및 타입 안전성 확보 |
| **Styling** | **TailwindCSS & Vanilla CSS Variables** | 일렉트릭 블루(`#0066FF`) & 사이버 시안(`#00D2FF`) 글래스모피즘 테마 |
| **Database** | **SQLite3 (`better-sqlite3`) + Dual JSON Store** | `data/velix.db` 파일 기반 고성능 DB (이중 동기화) |
| **File Storage** | **AWS S3 Bucket + Proxy File API** | 모든 사진/동영상/PDF 업로드 및 프록시 스트리밍 (`/api/files`) |
| **Infra & Web Server** | **AWS EC2 (Ubuntu 24.04 LTS) + Nginx + PM2** | ALB HTTPS 443 -> Nginx 80 -> Next.js (Port 3000) |

---

## 2. 📂 프로젝트 폴더 구조 (Directory Structure)

```
velix/
├── data/                       # [중요] 서버 DB 데이터 폴더 (EC2 복구 시 최우선 보존)
│   ├── velix.db                # SQLite3 메인 데이터베이스 파일
│   └── velix_store.json        # 2차 이중 자동 백업 JSON 데이터 파일
├── public/                     # 정적 에셋 (로고, 파비콘, 폰트)
│   ├── logo.jpg / logo.png     # 브랜드 메탈릭 V 로고
│   ├── favicon.ico / icon.png  # 브라우저 탭 아이콘
│   └── uploads/                # 로컬 업로드 백업 폴더
├── src/
│   ├── app/                    # Next.js App Router 페이지 및 API 라우트
│   │   ├── admin/              # 관리자 대시보드 CMS (`/admin`, `/admin/login`)
│   │   ├── business/           # 사업영역 (사업소개, 제휴문의, 에이전트 지원)
│   │   ├── community/          # 커뮤니티 (인사이트, 공지사항, FAQ)
│   │   ├── creator/            # 크리에이터 (지원혜택, BJ/크리에이터 지원)
│   │   ├── velixent/           # 회사소개 (인삿말, 조직도, 오시는길)
│   │   └── api/                # 백엔드 REST API 라우트 핸들러
│   │       ├── admin/          # 관리자 인증/지원서조회/게시글CMS/S3업로드 API
│   │       ├── creator/        # 크리에이터 지원서 접수 API
│   │       ├── business/       # 에이전트 지원서 및 제휴문의 접수 API
│   │       ├── cron/           # 주 1회 S3 DB 백업 크론 API (`/api/cron/weekly-backup`)
│   │       └── files/          # AWS S3 파일 다운로드 및 실시간 스트리밍 프록시 API
│   ├── components/             # 공통 UI 컴포넌트 (Navbar, Footer, FloatingMenu)
│   └── lib/                    # 데이터베이스 및 외부 서비스 연동 라이브러리
│       ├── db.ts               # SQLite3 & JSON 이중 백업 DB 연결 모듈
│       └── s3.ts               # AWS S3 업로드 & 주 1회 백업 모듈
├── deploy-ec2.sh               # [필수] EC2 원클릭 자동 배포 및 서버 재시작 스크립트
├── backup-db-to-s3.sh          # [필수] 주 1회 AWS S3 DB 자동 백업 쉘 스크립트
└── .env.production             # [보안] AWS S3 및 환경변수 설정 파일 (git 제외 대상)
```

---

## 3. 🔐 관리자 계정 & 데이터베이스(DB) 접속 및 수정 방법

### 3-1. 관리자 대시보드 웹로그인 (Admin Web Login)
- **접속 URL**: `https://velix.moibluu.com/admin` 또는 `/admin/login`
- **관리자 초기 비밀번호**: `velix1234` (관리자 대시보드 로그인 후 **[비밀번호 변경]** 버튼을 통해 자유롭게 변경하실 수 있으며, 변경된 비밀번호는 `data/admin_password.json` 파일에 저장되어 영구 유지됩니다).
- **인증 세션 방식**: HTTP-Only 암호화 쿠키 (`velix_admin_auth`)

---

### 3-2. 데이터베이스(DB) 직접 접속 및 데이터 수정 방법

데이터베이스는 EC2 서버의 **`velix/data/velix.db`** (SQLite3 파일)에 위치합니다.

#### 방법 A: EC2 터미널에서 `sqlite3` CLI로 직접 조회/수정하기
EC2 서버 접속 후 아래 명령어로 DB 테이블 조회 및 SQL 수정이 가능합니다:

```bash
cd /home/ubuntu/velix

# 1. SQLite CLI 접속
sqlite3 data/velix.db

# 2. 테이블 목록 확인
.tables

# 3. 크리에이터 지원서 데이터 조회
SELECT id, name, phone, email, created_at FROM creator_applications;

# 4. 에이전트 지원서 데이터 조회
SELECT id, name, phone, email, residence FROM agent_applications;

# 5. 비즈니스 문의 조회
SELECT id, name, company, phone FROM business_inquiries;

# 6. 특정 데이터 삭제 예시 (SQL)
DELETE FROM creator_applications WHERE id = 5;

# 7. 종료
.exit
```

#### 방법 B: DBeaver 또는 VS Code 확장을 통한 GUI 수정
1. DBeaver 또는 VS Code `SQLite Viewer` 확장을 설치합니다.
2. SFTP 접속(EC2 IP, `ubuntu` 계정, Key Pair 지정)으로 `data/velix.db` 파일에 연결하면 테이블과 데이터를 엑셀처럼 표 형태로 열람 및 직접 수정이 가능합니다.

---

### 3-3. 주요 데이터베이스 테이블 명세 (DB Schema)

| 테이블 명 (`Table Name`) | 용도 | 주요 컬럼 (Columns) |
| :--- | :--- | :--- |
| `creator_applications` | BJ / 크리에이터 지원서 | `id`, `name`, `gender`, `phone`, `email`, `birthdate`, `residence`, `sns`, `has_studio`, `bio`, `file_url`, `files_json`, `created_at` |
| `agent_applications` | 에이전트 모집 지원서 | `id`, `name`, `gender`, `phone`, `email`, `residence`, `sns`, `bio`, `file_url`, `files_json`, `created_at` |
| `business_inquiries` | 비즈니스 제휴 문의 | `id`, `name`, `email`, `phone`, `birthdate`, `residence`, `sns`, `bio`, `file_url`, `files_json`, `created_at` |
| `insights` | 인사이트 게시글 (CMS) | `id`, `title`, `category`, `excerpt`, `content`, `thumbnail`, `created_at` |
| `notices` | 공지사항 (CMS) | `id`, `title`, `content`, `created_at` |
| `faqs` | 자주묻는질문 FAQ (CMS) | `id`, `question`, `answer`, `category`, `order_index`, `created_at` |

---

## 4. ☁️ AWS S3 연동 및 환경 변수 (`.env.production`)

서버 루트 디렉토리의 **`.env.production`** 파일에 AWS S3 인증 정보가 기재되어 있습니다:

```ini
NODE_ENV=production
PORT=3000

# AWS S3 Storage Credentials
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET_NAME=velix-media-storage
AWS_ACCESS_KEY_ID=AKIA****************
AWS_SECRET_ACCESS_KEY=********************************
```

- **첨부 미디어 업로드**: 모든 사진/동영상/PDF 업로드 시 S3의 `uploads/`, `creator_video/`, `agent_file/` 등의 경로로 자동 저장됩니다.
- **이미지 스트리밍 프록시 API**: S3 퍼블릭 차단 상태에서도 이미지가 엑박 없이 표시되도록 **`/api/files?key=...`** 라우트 핸들러가 S3 스트림을 중간에서 안전하게 전달합니다.

---

## 5. 🆘 EC2 삭제 / 백업 서버 재구축 시 완전 복구 절차 (Emergency Recovery)

만약 **EC2 인스턴스가 완전히 삭제되거나 초기화**되었을 때, 신규 EC2 인스턴스를 생성하고 서비스 및 기존 DB 데이터를 100% 원상 복구하는 순서입니다.

### [1단계] 신규 EC2 인스턴스 생성 & 필수 패키지 설치
우분투 24.04 LTS 인스턴스를 생성하고 SSH 접속 후 필수 패키지를 설치합니다:

```bash
# 1. 시스템 업데이트 & Node.js 20 설치
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs build-essential sqlite3 awscli git

# 2. PM2 프로세스 매니저 글로벌 설치
sudo npm install -g pm2
```

### [2단계] 소스코드 클론 및 환경 변수 작성
```bash
cd /home/ubuntu
git clone https://github.com/SungYil/velix.git
cd velix

# .env.production 작성
nano .env.production
```
*(기존 S3 AccessKey 및 BucketName을 `.env.production`에 붙여넣고 저장합니다)*

### [3단계] AWS S3에서 최신 데이터베이스(DB) 백업 복원하기
주 1회 AWS S3 버킷의 `backups/` 폴더로 백업된 데이터베이스 최신본을 다운로드하여 복원합니다:

```bash
# 1. AWS CLI 인증 설정 (또는 .env 설정)
aws configure set aws_access_key_id "YOUR_AWS_ACCESS_KEY_ID"
aws configure set aws_secret_access_key "YOUR_AWS_SECRET_ACCESS_KEY"
aws configure set default.region "ap-northeast-2"

# 2. data 폴더 생성
mkdir -p data

# 3. S3 버킷에 저장된 가장 최근 DB 백업 파일 확인
aws s3 ls s3://velix-media-storage/backups/

# 4. 가장 최신 DB 파일 다운로드 및 velix.db 로 복원
# (예시: velix_2026-08-10_03-00-00.db 다운로드)
aws s3 cp s3://velix-media-storage/backups/velix_2026-08-10_03-00-00.db data/velix.db
aws s3 cp s3://velix-media-storage/backups/velix_store_2026-08-10_03-00-00.json data/velix_store.json
```

### [4단계] 빌드 및 서비스 구동
```bash
chmod +x deploy-ec2.sh
./deploy-ec2.sh
```

### [5단계] 주 1회 자동 백업 크론(Crontab) 등록
```bash
chmod +x backup-db-to-s3.sh
(crontab -l 2>/dev/null; echo "0 3 * * 0 /home/ubuntu/velix/backup-db-to-s3.sh >> /home/ubuntu/velix/backup.log 2>&1") | crontab -
```

---

## 6. 🛠️ 일상 유지보수 배포 방법 (Routine Deployment)

코드 수정 후 깃허브에 푸시(Push)한 뒤 EC2 터미널에서 다음 명령어 한 줄로 즉시 반영됩니다:

```bash
cd /home/ubuntu/velix
git pull
./deploy-ec2.sh
```

---

### 📞 시스템 관리자 연락처
- **개발 & 관리 MCN**: (주)벨릭스미디어 (VelixMEDIA)
- **공식 홈페이지**: `https://velix.moibluu.com`
- **카카오톡 오픈채팅**: `https://open.kakao.com/o/g3o55Cvi`
- **공식 인스타그램**: `@velix_media0`
