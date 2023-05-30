import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8001,
    proxy: {
      '/blog-api': {
        target: 'http://localhost:4000',
        // pathRewrite: { '^/blog-api': '' },
        secure: false,
        changeOrigin: true,
        xfwd: true, // 添加x-forward headers
      },
      '/adminupload': {
        target: 'http://localhost:5555',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
