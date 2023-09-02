export interface ViteVConsoleOptions {
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

export interface ConsoleProps {
  defaultPlugins?: string[];
  onReady?: () => void;
  onClearLog?: () => void;
  maxLogNumber?: number;
  disableLogScrolling?: boolean;
  theme?: 'light' | 'dark';
}
