import type { viteVConsoleOptions } from './types';
import type { PluginOption } from 'vite';

import { type ResolvedConfig } from 'vite';

export default function viteVConsole(opt: viteVConsoleOptions): PluginOption {
  let viteConfig: ResolvedConfig;
  const { enabled = true, config = {}, entry = true, pageDir = 'src/pages' } = opt;

  return {
    name: 'vite:vconsole',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transform(_source: string, id: string) {
      const pages: any = viteConfig.build.rollupOptions.input;

      let _entryPath: string[] = [];

      const isMPA =
        typeof viteConfig.build.rollupOptions.input !== 'string' &&
        Object.keys(viteConfig.build.rollupOptions.input || {}).length > 0;

      if (isMPA) {
        if (typeof entry === 'boolean' && entry) {
          for (const key in pages) {
            _entryPath.push(pages[key].replace('index.html', 'main.ts'));
          }
        } else if (Array.isArray(entry)) {
          for (const item of entry) {
            _entryPath.push(viteConfig.root + '/' + pageDir + '/' + item + '/' + 'main.ts');
          }
        } else {
          for (const item of [entry]) {
            _entryPath.push(viteConfig.root + '/' + pageDir + '/' + item + '/' + 'main.ts');
          }
        }
      } else {
        if (id.includes('main.ts')) {
          _entryPath = [id];
        }
      }

      if (String(_entryPath).replace(/\\/g, '/').split(',').includes(id) && enabled) {
        // build prod
        return {
          code: `/* eslint-disable */;import VConsole from 'vconsole';new VConsole(${JSON.stringify(
            config
          )});/* eslint-enable */${_source}`,
          map: null // support source map
        };
      }
      return {
        code: _source,
        map: null // support source map
      };
    }
  };
}

export * from './types';
