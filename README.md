# @rc-component/dumi-plugin

[![NPM version](https://img.shields.io/npm/v/@rc-component/dumi-plugin.svg?style=flat)](https://npmjs.org/package/@rc-component/dumi-plugin) [![NPM downloads](http://img.shields.io/npm/dm/@rc-component/dumi-plugin.svg?style=flat)](https://npmjs.org/package/@rc-component/dumi-plugin)

The father plugin for all react-component projects.

## Usage

Install this plugin in `devDependencies`:

```bash
$ npm i @rc-component/dumi-plugin -D
```

Register it in `.dumirc.ts`:

```ts
import { defineConfig } from 'dumi';

export default defineConfig({
  plugins: ['@rc-component/dumi-plugin'],
});
```

## Development

```bash
$ pnpm install
```

```bash
$ npm run dev
$ npm run build
```

## LICENSE

MIT
