import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@plugins/chartjs': resolve(__dirname, './plugins/chartjs/src')
    },
  },
  css: {
    // Ensure CSS modules work with external plugins
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  },
  // Configure optimizeDeps to include plugin dependencies
  optimizeDeps: {
    include: ['chart.js', 'react-chartjs-2'],
  },
  // Add plugin watch paths to trigger rebuilds
  server: {
    watch: {
      // Watch for changes in the plugins directory
      ignored: ['!**/plugins/**'],
    },
  },
})
