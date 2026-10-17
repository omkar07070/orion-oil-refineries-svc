import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
    // Minification is enabled by default in production
    sourcemap: false,
    chunkSizeWarningLimit: 500,
  },
  // Speed up dev server cold start by pre-bundling these deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  server: {
    // Pre-warm the client so first page load is faster
    warmup: {
      clientFiles: ['./index.html', './src/main.jsx', './src/App.jsx'],
    },
  },
})
