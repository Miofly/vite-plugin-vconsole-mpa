export interface viteVConsoleOptions {
  /**
   * multi page page entry
   * @default: src/pages
   */
  pageDir?: string;
  /**
   * single page without configuration
   * @example multi page：true(pageDir all pages open) | test-one | ['test-one', 'test-twos']
   */
  entry?: string[] | string | boolean;
  /**
   * open or not
   */
  enabled?: boolean;
  /**
   * vconsole configuration
   */
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
