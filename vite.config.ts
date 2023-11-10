import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      compilerOptions: {
        isCustomElement: (tag) => ['passage-'].includes(tag)
      }
    }),
    VitePWA({
      includeAssets: [
        '/img/icons/favicon.ico',
        '/img/icons/apple-touch-icon.png',
        '/img/icons/masked-icon.svg'
      ],

      manifest: {
        name: 'Weekmenu',
        short_name: 'Weekmenu',
        description: 'Weekmenu',
        theme_color: '#121212',
        icons: [
          {
            src: '/img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        protocol_handlers: [
          {
            protocol: 'web+weekmenu',
            url: '/%s'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
