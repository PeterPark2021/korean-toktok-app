import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: false,
    watch: {
      ignored: ['**/books/**', '**/data/**', '**/.agents/**']
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (
            id.includes('/src/data/dialogues/') ||
            id.includes('/src/data/vocab/') ||
            id.includes('/src/data/grammar/') ||
            id.includes('/src/data/quiz/') ||
            id.includes('/src/data/kbs/') ||
            id.includes('/src/data/wiz/') ||
            id.includes('\\src\\data\\dialogues\\') ||
            id.includes('\\src\\data\\vocab\\') ||
            id.includes('\\src\\data\\grammar\\') ||
            id.includes('\\src\\data\\quiz\\') ||
            id.includes('\\src\\data\\kbs\\') ||
            id.includes('\\src\\data\\wiz\\')
          ) {
            return 'data-units';
          }
        }
      }
    }
  }
});

