import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    open: false
  },
  preview: {
    port: 8080,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'esnext'
  }
})
