import { UserPluginConfig } from './types';

const GOOGLEAPIS_HOST = 'fonts.googleapis.com';
const GSTATIC_HOST = 'fonts.gstatic.com';

class GoogleFontInjector {
  config: UserPluginConfig;
  constructor(config: UserPluginConfig) {
    this.config = config;
  }
  inject(html: string) {
    const { fonts, proxy, display } = this.config;
    const apisHost = proxy || GOOGLEAPIS_HOST;
    const gstaticHost = proxy || GSTATIC_HOST;
    const fontFamily = fonts.map((font) => {
      const family = `${font.family.replace(/\s/g, '+')}`;
      if (font.weight) {
        return `${family}:wght@${font.weight.join(';')}`;
      }
      return family;
    });
    const preconnect = `<link rel="preconnect" href="https://${apisHost}" crossorigin><link rel="preconnect" href="https://${gstaticHost}" crossorigin>`;
    const cssUrl = `https://${apisHost}/css2?family=${fontFamily.join('&family=')}&display=${display || 'swap'}`;
    const cssTag = `<lint href="${cssUrl}" rel="stylesheet">`;
    return html.replace('</head>', `${preconnect}${cssTag}</head>`);
  }
}

export const getInjector = (config: UserPluginConfig) => {
  // check fonts in config
  if (!config.fonts || !Array.isArray(config.fonts)) {
    console.warn('[vite-plugin-gfont] You should specify at least one font to inject.');
    return null;
  }
  if (!config.display) {
    Object.assign(config, {
      display: 'swap',
    });
  }
  return new GoogleFontInjector(config);
};
