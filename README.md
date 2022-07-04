# vite-plugin-vconsole

> vite2 plugin for vconsole
>
> A plug-in for vite2 that loads single page and multi page 'vconsole' configurations

## install (yarn or pnpm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-vconsole -D
# or
pnpm add vite-plugin-vconsole -D
```

## singlePage

Default entry `srcmain Ts`, no configuration required

### Examples

- `see` [src/examples](https://github.com/Miofly/vite-plugin-vconsole-mpa/tree/master/example/vue-single-page)

## multiPage

### Examples

- `see` [src/examples](https://github.com/Miofly/vite-plugin-vconsole-mpa/tree/master/example/vite-plugin-demo)

## Options

```typescript
export interface viteVConsoleOptions {
  /**
   * multiPage PageEntry
   * option: string (default: src/pages)
   */
  pageDir?: string;
  /**
   * single page without configuration
   * Multi page：true(All pages under page dir are opened) | test-one | ['test-one', 'test-twos']
   */
  entry?: string[] | string | boolean;
  /** openOrNot */
  enabled?: boolean;
  /** vconsole toConfigure */
  config?: voption;
}
```
