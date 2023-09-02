import type { ViteVConsoleOptions } from './types';
import type { ResolvedConfig, Plugin } from 'vite';

const parseVConsoleOptions = (config: Record<string, unknown>) =>
  Object.keys(config).reduce((code, key) => {
    const value = config[key];
    if (typeof value === 'function') {
      if (/^[(f]/.test(value.toString())) {
        code += `${key}: ${value},`;
        return code;
      } else {
        code += `${value},`;
        return code;
      }
    }
    code += `${key}: ${JSON.stringify(config[key])},`;
    return code;
  }, '');

const getEventItems = (
  event: {
    eventName: string;
    callback: (data?: any) => void;
  }[],
  id: string,
) => {
  return event
    .map(
      (ele: { eventName: string; callback: (data?: any) => void }) => `
    ${id}.on('${ele.eventName}', ${ele.callback})
    `,
    )
    .join(';');
};

export default function viteVConsole(opt: ViteVConsoleOptions): Plugin {
  let viteConfig: ResolvedConfig;
  const {
    enabled = true,
    config = {
      theme: 'light',
    },
    entry,
    pageDir = 'src/views',
    entryFileName = 'main.ts',
    customHide = false,
    plugin,
  } = opt;

  return {
    name: 'vite:vconsole',
    enforce: 'pre',
    configResolved(resolvedConfig: ResolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transform(source: string, id: string) {
      if (enabled) {
        const pages: any = viteConfig.build.rollupOptions.input;

        let entryPath: string[] = [];

        const isMPA =
          typeof viteConfig.build.rollupOptions.input !== 'string' &&
          Object.keys(viteConfig.build.rollupOptions.input || {}).length > 0;

        let _entry = entry ? entry : isMPA ? true : entryFileName;

        // multi page entry
        if (isMPA) {
          if (typeof _entry === 'boolean' && _entry) {
            for (const key in pages) {
              entryPath.push(pages[key].replace('index.html', 'main.ts'));
            }
          } else {
            _entry = (Array.isArray(_entry) ? _entry : [_entry]) as string[];

            for (const item of _entry) {
              entryPath.push(
                viteConfig.root +
                  '/' +
                  pageDir +
                  '/' +
                  item +
                  '/' +
                  entryFileName,
              );
            }
          }
        } else {
          if (id.includes(_entry as string)) {
            entryPath = [id];
          }
        }

        entryPath = entryPath.map(item => item.replace(/\\/g, '/'));

        if (entryPath?.length && entryPath.includes(id)) {
          let plugins = '';
          if (plugin && plugin.length) {
            plugins = plugin
              .map(
                e => `
          const ${e.id} = new VConsole.VConsolePlugin('${e.id}', '${e.name}');
          ${getEventItems(e.event, e.id)}
          vConsole.addPlugin(${e.id})
          `,
              )
              .join(';');
          }

          const code = `/* eslint-disable */;
        import VConsole from 'vconsole';
        const vConsole = new VConsole({${parseVConsoleOptions(
          config as Record<string, unknown>,
        )}});
        window.vConsole = vConsole;
        ${plugins}
        if (${customHide}) {
          if (window.vConsole) {
            setTimeout(() => {
            	window.vConsole.destroy();
              window.vConsole = null;
            }, 50)
          }
        }
        /* eslint-enable */${source}`;

          return {
            code,
            map: null,
          };
        } else {
          return {
            code: source,
            map: null,
          };
        }
      }

      return {
        code: source,
        map: null,
      };
    },
  };
}

export * from './types';
