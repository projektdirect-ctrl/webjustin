import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

function skipUnavailablePublicFiles(): Plugin {
  return {
    name: 'skip-unavailable-public-files',
    apply: 'build',
    closeBundle() {},
    generateBundle() {},
    writeBundle: {
      order: 'post',
      handler() {},
    },
    config(config) {
      return config;
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'safe-public-copy',
      apply: 'build',
      enforce: 'post',
      closeBundle() {
        const publicDir = path.resolve(__dirname, 'public');
        const outDir = path.resolve(__dirname, 'dist');
        const files = fs.readdirSync(publicDir);
        for (const file of files) {
          const src = path.join(publicDir, file);
          const dest = path.join(outDir, file);
          try {
            fs.accessSync(src, fs.constants.R_OK);
            if (!fs.existsSync(dest)) {
              fs.copyFileSync(src, dest);
            }
          } catch {
          }
        }
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  publicDir: 'public',
});
