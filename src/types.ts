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

export interface voption {
  defaultPlugins?: string[];
  onReady?: () => void;
  onClearLog?: () => void;
  maxLogNumber?: number;
  disableLogScrolling?: boolean;
  theme?: 'light' | 'dark';
}
