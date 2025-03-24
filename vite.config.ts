import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: './', // 🌟 Bu satır Azure Web App için kritik
  plugins: [
    react(),
    tailwindcss(),
  ],
});
