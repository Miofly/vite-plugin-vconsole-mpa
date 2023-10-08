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
    open: true,
  },
  plugins: [
    vue(),
    // by default no configuration is required
    // viteVConsole({}),

    // custom configuration
    viteVConsole({
      enabled: true,
      config: {
        theme: 'dark',
        onReady() {
          console.log('init');
        },
      },
      // Customize the rule so that it triggers a destroy, as shown below, and do not show vConsole for PC mode
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
    open: true,
  },
  plugins: [
    vue(),
    mpa(),
    htmlTemplate(),
    // by default no configuration is required
    // viteVConsole({}),

    viteVConsole({
      pageDir: 'src/pages',
      entry: ['test-one'],
    }),
  ],
});
```

## configuration parameter

```typescript
export interface viteVConsoleOptions {
  /**
   * multi page page entry
   * @default: src/views
   */
  pageDir?: string;
  /**
   * single page without configuration
   * @example multi page：true(pageDir all pages open) | test-one | ['test-one', 'test-twos']
   */
  entry?: string[] | string | boolean;
  /**
   * entry file
   * @default: main.ts
   */
  entryFileName?: string;
  /**
   * open or not
   */
  enabled?: boolean;
  /**
   * vconsole configuration
   */
  config?: ConsoleProps;
  /**
   * custom hide rule code string
   * A runnable code snippet that triggers some APIs on the browser side
   */
  customHide?: string;
  /**
   * custom plugin
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
