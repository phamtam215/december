/**
 * POSTCSS CONFIGURATION FILE
 * ===========================
 * PostCSS là CSS processor - tool để transform CSS
 *
 * PostCSS hoạt động như:
 * - Babel cho JavaScript: transform modern CSS thành compatible CSS
 * - Plugin ecosystem để extend functionality
 * - Integration với build tools như Vite, Webpack
 */

export default {
  // =============== PLUGINS ===============
  plugins: {
    // Plugin để process Tailwind CSS
    tailwindcss: {},
    /*
      Plugin này:
      - Process @tailwind directives trong CSS
      - Generate utility classes từ config
      - Purge unused CSS trong production
      - Transform Tailwind syntax thành standard CSS
    */

    // Plugin để tự động thêm vendor prefixes
    autoprefixer: {}
    /*
      Plugin này:
      - Tự động thêm prefixes (-webkit-, -moz-, -ms-) cho CSS properties
      - Dựa trên browserlist config để biết browsers nào cần support
      - Ví dụ: transform "display: flex" thành:
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    */
  }

  /*
  Các plugins PostCSS khác thường dùng:
  
  plugins: {
    'postcss-import': {},           // Import CSS files
    'postcss-nested': {},           // Nested CSS như Sass
    'postcss-custom-properties': {},// CSS custom properties support
    'cssnano': {}                   // CSS minification
  }
  */
}
