export type FontFaceDisplay = 'auto' | 'block' | 'fallback' | 'optional' | 'swap';

interface FontStyle {
  weight: number;
  italic?: boolean;
};

export type FontStyleInline = number | FontStyle;

export interface GoogleFont {
  family: string;
  styles?: FontStyleInline[];
}

export interface UserPluginConfig {
  fonts: GoogleFont[];
  proxy?: string;
  display?: FontFaceDisplay;
  persistCSS?: boolean;
}
