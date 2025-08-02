/**
 * VITE ENVIRONMENT TYPES
 * =======================
 * File TypeScript definitions cho Vite environment
 *
 * File .d.ts là:
 * - Declaration files - chỉ chứa type definitions, không có implementation
 * - Cung cấp type information cho TypeScript compiler
 * - Giúp IDE hiểu và provide IntelliSense cho các APIs
 */

/// <reference types="vite/client" />
/*
  Triple-slash directive để reference Vite's client types
  
  Directive này cung cấp:
  - Types cho import.meta.env (environment variables)
  - Types cho import.meta.hot (HMR API)
  - Types cho dynamic imports với ?url, ?raw suffixes
  - Types cho asset imports (images, fonts, etc.)
  
  Ví dụ các APIs được type:
  - import.meta.env.VITE_API_URL (string | undefined)
  - import.meta.env.MODE ('development' | 'production')
  - import.meta.hot?.accept() (HMR functions)
  - import logo from './logo.svg' (string - asset URL)
*/

/*
  CUSTOM ENVIRONMENT VARIABLES
  =============================
  Nếu bạn có custom env variables, declare types ở đây:
  
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_APP_TITLE: string
    // Thêm các env vars khác...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
*/
