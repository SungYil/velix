#!/bin/bash
# Exit immediately if a command exits with a non-zero status
set -e

# 항상 스크립트가 위치한 디렉토리로 이동
CDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$CDIR"

DOMAIN="moibluu.com"
WWW_DOMAIN="www.moibluu.com"

echo "🚀 [1/6] 시스템 패키지 업데이트 및 필요 도구 설치..."
sudo apt-get update -y
sudo apt-get install -y curl git build-essential nginx sqlite3 libsqlite3-dev

echo "🚀 [2/6] Node.js 20 LTS 및 PM2 설치..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

echo "🚀 [3/6] Swap 메모리 2GB 설정..."
if [ ! -f /swapfile ]; then
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

echo "🚀 [4/6] 디렉토리 및 권한 준비..."
mkdir -p data public/uploads
chmod -R 777 data public/uploads

echo "🚀 [5/6] 이전 빌드 정리 및 Standalone 프로덕션 빌드..."
npm install
npm rebuild better-sqlite3
rm -rf .next

echo "Executing npm run build..."
npm run build

echo "Copying static assets to standalone folder..."
cp -r public .next/standalone/ || true
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/

if [ ! -f ".next/standalone/server.js" ]; then
    echo "❌ error: .next/standalone/server.js 파일이 생성되지 않았습니다!"
    exit 1
fi

echo "🚀 [6/6] PM2 무중단 프로세스 초기화 및 구동..."
pm2 delete velix 2>/dev/null || true
pm2 kill 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo "🚀 [7/7] Nginx 설정 (AWS ALB 헬스체크 및 도메인 호환)..."
sudo cat <<EOF | sudo tee /etc/nginx/sites-available/velix
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _ ${DOMAIN} ${WWW_DOMAIN};

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$http_x_forwarded_proto;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/velix /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "🎉 Nginx 및 Next.js Standalone 배포 완벽 성공!"
pm2 status
