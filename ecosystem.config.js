const path = require('path');

module.exports = {
  apps: [
    {
      name: 'velix',
      script: path.join(__dirname, 'server.js'),
      cwd: __dirname,
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
