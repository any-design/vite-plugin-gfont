# vite-plugin-gfont

This plugin can automatically inject google font tags into your HTML.

## Usage

Step 1: Install the package.

```bash
npm install vite-plugin-gfont -D
```

Step 2: Import it to your vite configuration.

```ts
import gfont from 'vite-plugin-gfont';

export default defineConfig({
  plugins: [gfont({
    proxy: '', // use proxy for google font
    fonts: [
      {
        family: 'Roboto',
        styles: [
          400,
          {
            weight: 500,
            italic: true,
          },
        ]; // weight or {weight, italic}, optional.
      },
    ],
    display: 'swap', // https://developer.mozilla.org/en-US/docs/Web/API/FontFace/display
  })],
});
```

## License

MIT
