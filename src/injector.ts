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
      if (font.styles) {
        const hasItalic = font.styles.reduce((res, curr) => {
          if (typeof curr === 'number') {
            return res;
          }
          if (curr.italic) {
            return res || true;
          }
          return res;
        }, false);
        // build prefix
        let prefix;
        if (hasItalic) {
          prefix = ':ital,wght@';
        } else {
          prefix = ':wght@';
        }
        // build data
        const styleData = font.styles.map((inlineStyle) => {
          if (typeof inlineStyle === 'number') {
            return hasItalic ? `0,${inlineStyle}` : inlineStyle;
          }
          return hasItalic ? `${inlineStyle.italic ? 1 : 0},${inlineStyle.weight}` : inlineStyle.weight;
        }).join(';');
        return `${family}${prefix}${styleData}`;
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
