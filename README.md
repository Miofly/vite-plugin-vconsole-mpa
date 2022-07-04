# vite-plugin-vconsole

> vite2 plugin for vconsole
>
> 一个适用于Vite2的插件，加载单页面以及多页面的 `vconsole` 配置

## 安装 (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-vconsole -D
# or
pnpm add vite-plugin-vconsole -D
```

## 单页面

默认入口 `src/main.ts`，无需任何配置

### Examples

- `see` [src/examples](https://github.com/Miofly/vite-plugin-vconsole-mpa/tree/master/example/vue-single-page)

## 多页面

### Examples

- `see` [src/examples](https://github.com/Miofly/vite-plugin-vconsole-mpa/tree/master/example/vue-plugin-demo)

## Options

```typescript
export interface viteVConsoleOptions {
  /**
   * 多页面页面入口
   * option: string (default: src/pages)
   */
  pageDir?: string;
  /**
   * 单页面无需配置
   * 多页面：true(pageDir下所有页面都开启) | test-one | ['test-one', 'test-twos']
   */
  entry?: string[] | string | boolean;
  /** 是否开启 */
  enabled?: boolean;
  /** vconsole 配置 */
  config?: voption;
}
```
