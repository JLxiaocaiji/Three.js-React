import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// import WindiCSS from 'vite-plugin-windicss';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // 省得在 tsconfig 中配置了，虽然没有
      '@': resolve('src'),
    }
  },
  assetsInclude: ['**/*.glb']
})
