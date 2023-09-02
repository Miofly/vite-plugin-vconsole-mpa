import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteVConsole from '../../src';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    vue(),
    // 默认无需任何配置
    // viteVConsole({}),
    // 自定义配置
    viteVConsole({
      enabled: true,
      config: {
        theme: 'dark',
        onReady() {
          console.log('init');
        },
      },
      // 自定义规则使其触发销毁,如下，为 PC 模式则不展示 vConsole
      customHide: `/Windows|Macintosh|Linux/i.test(navigator.userAgent)`,
      plugin: [
        {
          id: 'custom_plugin',
          name: 'CustomPlugin',
          event: [
            {
              eventName: 'init',
              callback: function () {
                console.log('My plugin init');
              },
            },
            {
              eventName: 'renderTab',
              callback: function () {
                console.log('My plugin renderTab');
              },
            },
          ],
        },
      ],
    }),
  ],
});
