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
    viteVConsole({
      enabled: true
    })
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
    viteVConsole({
      enabled: true,
      entry: ['test-one']
    })
  ]
});
```

## 配置参数

```typescript
export interface viteVConsoleOptions {
  /**
   * 多页面入口目录
   * @default: src/pages
   */
  pageDir?: string;
  /**
   * 入口文件
   * @example
   * 单页面：无需设置（默认 main.ts）
   * 多页面：true(所有 pageDir 下的页面都会开启) | test-one（只开启 test-one） | ['test-one', 'test-twos'] (开启数组中的配置页面)
   */
  entry?: string[] | string | boolean;
  /**
   * 是否开启
   */
  enabled?: boolean;
  /**
   * vconsole 配置
   */
  config?: voption;
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
