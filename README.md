# 🚀 VelixMEDIA (주)벨릭스미디어 공식 웹사이트 프로젝트

차세대 MCN & 1인 라이브 크리에이터 브랜딩 그룹 **VelixMEDIA (주)벨릭스미디어** 공식 웹사이트 및 통합 관리자 CMS 시스템입니다.

## 📘 시스템 인수인계 & 유지보수 백서 (Handoff Document)
프로젝트 아키텍처, 데이터베이스 접속/수정 방법, 관리자 ID/비밀번호, EC2 장애 복구 가이드는 아래 문서를 참고해 주세요:

👉 **[HANDOVER.md (인수인계 백서 읽기)](./HANDOVER.md)**

---

## 🛠️ 간단 개발 및 배포 가이드

### 1. 로컬 개발 서버 실행
```bash
npm run dev
```

### 2. EC2 서버 수동 배포
```bash
git pull
./deploy-ec2.sh
```

### 3. 관리자 대시보드
- **URL**: `https://velix.moibluu.com/admin`
- **ID**: `admin`
- **PW**: `velix2026!`
