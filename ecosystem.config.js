const path = require('path');

const projectDir = path.resolve(__dirname);

module.exports = {
  apps: [
    {
      name: 'velix',
      script: 'npm',
      args: 'run start',
      cwd: projectDir,
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
};
