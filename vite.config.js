import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const checkLocalhost = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/persons')
    return response.ok
  } catch (error) {
    return false
  }
}

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const isLocalhostAvailable = await checkLocalhost()

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: isLocalhostAvailable
            ? 'http://localhost:3001'
            : 'https://full-stack-part-3-hff4.onrender.com',
          changeOrigin: true,
        },
      }
    },
  }
})