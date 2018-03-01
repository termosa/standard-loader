# typescript-standard-loader

webpack loader for linting your code with [TypeScript Standard Style](https://github.com/e2tox/typescript-standard)

[![Build Status](https://travis-ci.org/termosa/typescript-standard-loader.png?branch=master)](https://travis-ci.org/termosa/typescript-standard-loader)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

## Installation

* Install the desired version of `typescript-standard` alongside `typescript-standard-loader`.

```
npm install --save-dev standard-loader typescript-standard
```

## Usage

### Webpack 2

```js
// webpack.config.js
const webpack = require('webpack')

const config = {
  // ...
  module: {
    rules: [
      {
        // set up typescript-standard-loader as a preloader
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'typescript-standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          // Prints the name of the failed rule (default = true)
          verbose: true,
          // enable snazzy output (default = true)
          snazzy: true
        }
      },
      // other loaders...
    ]
  }
}

module.exports = config
```


### Example Input

```js
// code not conforming to standard style

const createHero = (Power: string) => {
  return { name: Power + ' Man' }
}
```

### Example Output

```
> webpack
Hash: c3f645e19ff5f5904902
Version: webpack 4.0.1
Time: 1060ms
Built at: 2018-3-2 01:10:38
 1 asset
Entrypoint main = index.js
   [0] ./index.ts 90 bytes {0} [built] [1 warning]

WARNING in ./index.ts
(Emitted value instead of an instance of Error)
/path/to/file/index.ts
  0:20  error  variable name must be in lowerCamelCase or UPPER_CASE

✖ 1 problem
```

## Licence

ISC
