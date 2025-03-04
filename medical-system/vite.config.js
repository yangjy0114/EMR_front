import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      devtools: false // 禁用 Vue DevTools 按钮
    })
  ],
  server: {
    // 禁用 Vite 开发工具按钮
    devtools: {
      enabled: false
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
