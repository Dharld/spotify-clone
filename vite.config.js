import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  builds: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: 'fonts/[name].[ext]',
      },
    },
  }
})
