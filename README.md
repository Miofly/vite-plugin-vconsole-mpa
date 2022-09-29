# vite-plugin-vconsole

**English** | [中文](./README.zh_CN.md)

> A 'vconsole' plugin that supports single and multiple pages

## INSTALL

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-vconsole-mpa -D
# or
pnpm add vite-plugin-vconsole-mpa -D
```

## How to use

singlePage

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

multiPage

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

## configuration parameter

```typescript
export interface viteVConsoleOptions {
  /**
   * multi page entry directory
   * @default: src/pages
   */
  pageDir?: string;
  /**
   * entry file
   * @example
   * single page：No setting required (default main.ts)
   * multi page：true(all pages under pagedir will open) | test-one（open only test-one） | ['test-one', 'test-twos'] (open the configuration page in the array)
   */
  entry?: string[] | string | boolean;
  /**
   * open or not
   */
  enabled?: boolean;
  /**
   * vconsole ToConfigure
   */
  config?: voption;
}
```

## Example

single page

- `see` [src/examples](https://github.com/Miofly/vite-plugin-vconsole-mpa/tree/master/examples/vite-plugin-demo-spa)

multi page

- `see` [src/examples](https://github.com/Miofly/vite-plugin-vconsole-mpa/tree/master/examples/vite-plugin-demo-mpa)

## More

- Cooperate with `vite-plugin-multi-pages` multi page application
  configuration: [https://github.com/Miofly/vite-plugin-multi-pages](https://github.com/Miofly/vite-plugin-multi-pages)
- Cooperate `vite-plugin-html-template-mpa` index.html template
  plugin : [https://github.com/Miofly/vite-plugin-html-template-mpa](https://github.com/Miofly/vite-plugin-html-template-mpa)
