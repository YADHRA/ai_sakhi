import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'https://ai-sakhi-4xs9.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})