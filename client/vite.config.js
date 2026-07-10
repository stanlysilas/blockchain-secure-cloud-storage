import path from 'path'
import pkg from './package.json'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: '/blockchain-secure-cloud-storage/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  }
})
