export type FontFaceDisplay = 'auto' | 'block' | 'fallback' | 'optional' | 'swap';

export interface GoogleFont {
  family: string;
  weight?: number[];
}

export interface UserPluginConfig {
  fonts: GoogleFont[];
  proxy?: string;
  display?: FontFaceDisplay;
}
