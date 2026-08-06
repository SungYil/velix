#!/bin/bash
# Exit immediately if a command exits with a non-zero status
set -e

# POSIX 호환 디렉토리 이동 ($0 호환)
CDIR="$( cd "$( dirname "$0" )" >/dev/null 2>&1 && pwd )"
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

echo "🚀 [4/6] 디렉토리 및 이전 캐시 완전 소거..."
rm -f server.js
rm -rf .next node_modules/.cache
mkdir -p data public/uploads

# Nginx(www-data 유저)가 /home/ubuntu 접근 가능하도록 755 접근 권한 부여 (403 Forbidden 완벽 방지)
sudo chmod 755 /home/ubuntu 2>/dev/null || true
sudo chmod 755 ${CDIR} 2>/dev/null || true
chmod -R 777 data public/uploads 2>/dev/null || true

echo "🚀 [5/6] 패키지 설치 및 단일 스레드 클린 빌드..."
npm install
npm rebuild better-sqlite3 2>/dev/null || true

echo "Executing npm run build in single worker mode..."
NODE_OPTIONS="--max-old-space-size=2048" NEXT_TELEMETRY_DISABLED=1 NEXT_PRIVATE_WORKERS=1 NEXT_MAX_WORKERS=1 UV_THREADPOOL_SIZE=1 npm run build

if [ ! -d ".next" ]; then
    echo "❌ error: .next 빌드 폴더가 생성되지 않았습니다!"
    exit 1
fi

sudo chmod -R 755 ${CDIR}/.next 2>/dev/null || true
chmod -R 777 data public/uploads 2>/dev/null || true

echo "🚀 [6/6] PM2 무중단 프로세스 초기화 및 구동..."
pm2 delete all 2>/dev/null || true
pm2 kill 2>/dev/null || true
pm2 flush 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save --force

sudo chmod -R 777 /var/lib/nginx /var/log/nginx 2>/dev/null || true

echo "🚀 [7/7] Nginx 설정 (정적 자산 직결 및 도메인 완벽 호환)..."
sudo cat <<EOF | sudo tee /etc/nginx/sites-available/velix
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _ ${DOMAIN} ${WWW_DOMAIN} velix.moibluu.com *.moibluu.com;

    client_max_body_size 50M;

    location /_next/static/ {
        alias ${CDIR}/.next/static/;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /uploads/ {
        alias ${CDIR}/public/uploads/;
        expires 30d;
        access_log off;
    }

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

        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/velix /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "🎉 Nginx 및 Next.js 배포 완벽 성공!"
pm2 status
