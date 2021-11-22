import type { Plugin } from 'vite';
import { getInjector } from './injector';
import { UserPluginConfig } from './types';

export default function Plugin(config: UserPluginConfig): Plugin {
  const injector = getInjector(config);
  return {
    name: 'vite-plugin-gfont',
    transformIndexHtml: (html: string) => {
      if (!injector) {
        return html;
      }
      return injector.inject(html);
    },
  }
};
