// client/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Importação oficial do motor v4

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Processa o CSS de forma ultra rápida e nativa sem precisar do PostCSS
  ],
})