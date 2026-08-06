const path = require('path');

module.exports = {
  apps: [
    {
      name: 'velix',
      script: path.join(__dirname, '.next/standalone/server.js'),
      cwd: path.join(__dirname, '.next/standalone'),
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
        AWS_REGION: process.env.AWS_REGION || 'ap-northeast-2',
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
        AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || '',
      },
    },
  ],
};
