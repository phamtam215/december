// Import các function và plugin cần thiết từ Vite
import { defineConfig } from 'vite' // Function để define config với TypeScript support
import react from '@vitejs/plugin-react' // Plugin để hỗ trợ React trong Vite

/**
 * VITE CONFIGURATION FILE
 * ========================
 * File cấu hình chính cho Vite build tool
 *
 * Vite là:
 * - Build tool hiện đại, nhanh hơn webpack
 * - Sử dụng ES modules trong development
 * - Hot Module Replacement (HMR) cực nhanh
 * - Optimized cho production builds
 */

// Export default config object
export default defineConfig({
  // =============== PLUGINS ===============
  plugins: [
    react() // Enable React support
    /*
      Plugin này cung cấp:
      - JSX transformation (biến JSX thành JavaScript)
      - Fast Refresh (HMR cho React components)
      - Automatic React import (không cần import React)
      - TypeScript support out of the box
    */
  ]

  // =============== ADDITIONAL CONFIG OPTIONS ===============
  /*
  Các options khác có thể thêm:
  
  server: {
    port: 3000,              // Port cho dev server
    host: true,              // Listen trên tất cả network interfaces
    proxy: {                 // Proxy API calls
      '/api': 'http://localhost:4000'
    }
  },
  
  build: {
    outDir: 'dist',          // Output directory
    sourcemap: true,         // Generate source maps
    rollupOptions: {         // Rollup config for production
      // ...
    }
  },
  
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
  */
})
