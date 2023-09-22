/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/project1',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '/tests/Handlers.tsx',
  },
})
