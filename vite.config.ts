import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: './test/setup.ts', // Optional setup file
    coverage: {
      reporter: ['text', 'json', 'html'], // Generates coverage reports
    },
  },
})
