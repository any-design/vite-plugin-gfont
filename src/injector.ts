import { UserPluginConfig } from "./types";

class GoogleFontInjector {
  config: UserPluginConfig;
  constructor(config: UserPluginConfig) {
    this.config = config;
  }
  inject(html: string) {}
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
