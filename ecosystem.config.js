module.exports = {
  apps: [
    {
      name: 'velix',
      script: 'npm',
      args: 'start',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
};
