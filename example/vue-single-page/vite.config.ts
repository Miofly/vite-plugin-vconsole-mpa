import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteVConsole from '../../src';

export default defineConfig({
  server: {
    open: true
  },
  plugins: [
    vue(),
    viteVConsole({
      enabled: true
    })
  ]
});
