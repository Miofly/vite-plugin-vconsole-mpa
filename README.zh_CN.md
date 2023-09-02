# vite-plugin-vconsole

**中文** | [English](./README.md)

> 一个支持 单/多 页面的 `vconsole` 插件

## 安装

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-vconsole-mpa -D
# or
pnpm add vite-plugin-vconsole-mpa -D
```

## 如何使用

单页面

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteVConsole from 'vite-plugin-vconsole-mpa';

export default defineConfig({
  server: {
    open: true
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
      // 自定义 vconsole 触发前置插件
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
  ]
});
```

多页面

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteVConsole from 'vite-plugin-vconsole-mpa';
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
    // 默认无需任何配置
    // viteVConsole({}),

    viteVConsole({
      pageDir: 'src/pages',
      entry: ['test-one']
    }),
  ]
});
```

## 配置参数

```typescript
export interface viteVConsoleOptions {
  /**
   * 多页面入口目录
   * @default: src/views
   */
  pageDir?: string;
  /**
   * 入口文件
   * @example
   * 单页面：无需设置
   * 多页面：true(所有 pageDir 下的页面都会开启) | test-one（只开启 test-one） | ['test-one', 'test-twos'] (开启数组中的配置页面)
   */
  entry?: string[] | string | boolean;
  /**
   * 入口文件名称
   * @default: main.ts
   */
  entryFileName?: string;
  /**
   * 是否开启
   */
  enabled?: boolean;
  /**
   * vconsole 配置
   */
  config?: voption;
  /**
   * 自定义隐藏规则代码字符串
   */
  customHide?: string;
  /**
   * 自定义插件
   */
  plugin?: {
    id: string;
    name: string;
    event: {
      eventName: string;
      callback: (data?: any) => void;
    }[];
  }[];
}
```

### 示例

单页面

- `see` [src/examples](https://github.com/Miofly/vite-plugin-vconsole-mpa/tree/master/examples/vite-plugin-demo-spa)

多页面

- `see` [src/examples](https://github.com/Miofly/vite-plugin-vconsole-mpa/tree/master/examples/vite-plugin-demo-mpa)

## 更多

- 配合 `vite-plugin-multi-pages`
  多页面应用配置: [https://github.com/Miofly/vite-plugin-multi-pages](https://github.com/Miofly/vite-plugin-multi-pages)
- 配合 `vite-plugin-html-template-mpa` 自动生成 `index.html`
  模板插件使用: [https://github.com/Miofly/vite-plugin-html-template-mpa](https://github.com/Miofly/vite-plugin-html-template-mpa)
