import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Custom plugin to duplicate index.html to 404.html and all SPA routes for static hosting
const spaFallbackPlugin = () => ({
  name: 'spa-fallback',
  closeBundle() {
    try {
      const distDir = path.resolve(__dirname, 'dist')
      const indexPath = path.join(distDir, 'index.html')
      const notFoundPath = path.join(distDir, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
        
        // Generate pre-rendered fallback HTML for every app route
        const appRoutes = [
          'admin', 'login', 'register', 'dashboard', 'about',
          'ambassador', 'contact', 'buy-nfc', 'nfc', 'events', 'ambassadors'
        ]
        for (const route of appRoutes) {
          const routeDir = path.join(distDir, route)
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true })
          }
          fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'))
          fs.copyFileSync(indexPath, path.join(distDir, `${route}.html`))
        }
        console.log('✓ Successfully created static route fallbacks for SPA routes including /admin.')
      }
    } catch (e) {
      console.error('Failed to create SPA fallback files:', e)
    }
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
})
