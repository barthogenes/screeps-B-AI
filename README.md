[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
![GitHub package.json version](https://img.shields.io/github/package-json/v/barthogenes/screeps-b-ai)
![GitHub](https://img.shields.io/github/license/barthogenes/screeps-b-ai)

# My Screeps AI

Based on the [screeps-typescript-starter](https://github.com/screepers/screeps-typescript-starter) template.

## Basic Usage

You will need:

 - [Node.JS](https://nodejs.org/en/download) (>= 8.0.0)
 - A Package Manager ([Yarn](https://yarnpkg.com/en/docs/getting-started) or [npm](https://docs.npmjs.com/getting-started/installing-node))
 - Rollup CLI (Optional, install via `npm install -g rollup`)
 - Python 2 (for node-gyp, [Python 3 is not supported](https://github.com/nodejs/node-gyp/issues/193))
 - Build tools (`apt install build-essential` for Ubuntu, [Visual Studio](https://www.visualstudio.com/vs/) for Windows, etc)

Open the repo folder in your terminal and run your package manager to install install the required packages and TypeScript declaration files:

```bash
# npm
npm install

# yarn
yarn
```

Fire up your preferred editor with typescript installed and you are good to go!

### Rollup and code upload

Screeps Typescript Starter uses rollup to compile your typescript and upload it to a screeps server.

Move or copy `screeps.sample.json` to `screeps.json` and edit it, changing the credentials and optionally adding or removing some of the destinations.

Running `rollup -c` will compile your code and do a "dry run", preparing the code for upload but not actually pushing it. Running `rollup -c --environment DEST:main` will compile your code, and then upload it to a screeps server using the `main` config from `screeps.json`.

You can use `-cw` instead of `-c` to automatically re-run when your source code changes - for example, `rollup -cw --environment DEST:main` will automatically upload your code to the `main` configuration every time your code is changed.

Finally, there are also NPM scripts that serve as aliases for these commands in `package.json` for IDE integration. Running `npm run push-main` is equivalent to `rollup -c --environment DEST:main`, and `npm run watch-sim` is equivalent to `rollup -cw --dest sim`.

#### Important! To upload code to a private server, you must have [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) installed and configured!

## Typings

The type definitions for Screeps come from [typed-screeps](https://github.com/screepers/typed-screeps). If you find a problem or have a suggestion, please open an issue there.

## Documentation

To visit the [screeps-typescript-starter](https://github.com/screepers/screeps-typescript-starter) docs, [click here](https://screepers.gitbooks.io/screeps-typescript-starter/).

## Contributing

Issues, Pull Requests, and contribution to the docs are welcome! See the [Contributing Guidelines](CONTRIBUTING.md) for more details.
