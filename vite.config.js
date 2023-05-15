import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { format } from 'path'

const resolve = (dir) => {
  return path.join(__dirname, `./${dir}`, )
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      '@com': resolve('src/components'),
    }
  },
  build: {
    lib: {
      entry: resolve('src/index.js'),
      name: 'DK-UI',
      fileName: format => `DK-UI.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "react",
          "react-dom": "react-dom",
        },
      },
    },
  }
})
