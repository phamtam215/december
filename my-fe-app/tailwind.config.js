/**
 * TAILWIND CSS CONFIGURATION FILE
 * ================================
 * File cấu hình cho Tailwind CSS framework
 *
 * Tailwind CSS là utility-first CSS framework:
 * - Sử dụng utility classes như .flex, .text-center, .bg-blue-500
 * - Responsive design với breakpoints sm:, md:, lg:, xl:
 * - State variants như hover:, focus:, active:
 * - Highly customizable và optimized
 */

/** @type {import('tailwindcss').Config} */
export default {
  // =============== CONTENT ===============
  // Đường dẫn đến các file chứa Tailwind classes
  content: [
    './index.html', // HTML template
    './src/**/*.{js,ts,jsx,tsx}' // Tất cả JS/TS/JSX/TSX files trong src/
    /*
      Tailwind sẽ scan các file này để:
      - Tìm các classes được sử dụng (vd: "bg-blue-500", "flex", "text-center")  
      - Chỉ generate CSS cho các classes thực sự được dùng
      - Loại bỏ unused CSS để optimize bundle size
      - Process này gọi là "purging" hoặc "tree-shaking"
    */
  ],

  // =============== THEME ===============
  theme: {
    extend: {
      // Extend default theme với custom values
      /*
      Ví dụ customize:
      
      colors: {
        // Thêm custom colors
        'brand-blue': '#1e40af',
        'brand-gray': '#6b7280'
      },
      
      fontFamily: {
        // Custom fonts
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace']
      },
      
      spacing: {
        // Custom spacing values
        '72': '18rem',
        '84': '21rem'
      },
      
      animation: {
        // Custom animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      }
      */
    }
  },

  // =============== PLUGINS ===============
  plugins: [
    // Thêm các Tailwind plugins
    /*
    Các plugins phổ biến:
    
    require('@tailwindcss/forms'),        // Better form styles
    require('@tailwindcss/typography'),   // Prose styles cho content
    require('@tailwindcss/aspect-ratio'), // Aspect ratio utilities
    require('@tailwindcss/line-clamp'),   // Text truncation
    */
  ]
}
