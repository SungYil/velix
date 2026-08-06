#!/bin/bash
# =================================================================
# VelixENT AWS EC2 Auto Deployment Script for moibluu.com
# =================================================================

DOMAIN="moibluu.com"
WWW_DOMAIN="www.moibluu.com"

echo "🚀 [1/6] 시스템 패키지 업데이트 및 기본 필요 도구 설치 중..."
sudo apt-get update -y
sudo apt-get install -y curl git build-essential nginx certbot python3-certbot-nginx sqlite3

echo "🚀 [2/6] Node.js 20 LTS 및 PM2 프로세스 매니저 설치 중..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

echo "🚀 [3/6] Swap 메모리 2GB 설정 (메모리 부족 방지)..."
if [ ! -f /swapfile ]; then
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

echo "🚀 [4/6] Next.js 앱 패키지 설치 및 빌드..."
npm install
npm run build

echo "🚀 [5/6] PM2 무중단 서비스 등록..."
pm2 stop velix 2>/dev/null || true
pm2 delete velix 2>/dev/null || true
pm2 start npm --name "velix" -- start
pm2 save

echo "🚀 [6/6] Nginx 리버스 프록시 및 SSL (HTTPS) 설정..."
sudo cat <<EOF | sudo tee /etc/nginx/sites-available/velix
server {
    listen 80;
    server_name ${DOMAIN} ${WWW_DOMAIN};

    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/velix /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "🎉 Nginx 설정이 완료되었습니다."
echo "HTTPS 무료 SSL 인증서를 발급하려면 아래 명령어를 별도로 실행해 주세요:"
echo "sudo certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN}"
