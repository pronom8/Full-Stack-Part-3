import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production'
        ? 'https://full-stack-part-3-hff4.onrender.com'
        : 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
