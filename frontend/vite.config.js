// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss({
//       config: {
//         content: [
//           "./index.html",
//           "./src/**/*.{js,ts,jsx,tsx}",
//         ],
        
//         plugins: [],
//       },
//     }),
//   ],
// })


// vite.config.js (Updated)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        
        plugins: [],
      },
    }),
  ],

  // <-- ADD THIS ENTIRE 'server' BLOCK
  server: {
    proxy: {
      // Proxies any request starting with /api to your backend
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      // Proxies the WebSocket connection for Socket.IO
      '/socket.io': {
        target: 'http://localhost:4000',
        ws: true,
      },
    },
  },
})