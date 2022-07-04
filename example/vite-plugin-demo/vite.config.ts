import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteVConsole from '../../src';
import mpa from 'vite-plugin-multi-pages';
import htmlTemplate from 'vite-plugin-html-template-mpa';

export default defineConfig({
  server: {
    open: true
  },
  plugins: [
    vue(),
    mpa(),
    htmlTemplate(),
    viteVConsole({
      enabled: true,
      entry: ['test-one']
    })
  ]
});
