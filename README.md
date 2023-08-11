# used-deps-analyzer
Analyse js code to force match between installed & used deps

[![Build status](https://api.travis-ci.org/Psychopoulet/used-deps-analyzer.svg?branch=master)](https://travis-ci.org/Psychopoulet/used-deps-analyzer)
[![Coverage status](https://coveralls.io/repos/github/Psychopoulet/used-deps-analyzer/badge.svg?branch=master)](https://coveralls.io/github/Psychopoulet/used-deps-analyzer)
[![Dependency status](https://david-dm.org/Psychopoulet/used-deps-analyzer/status.svg)](https://david-dm.org/Psychopoulet/used-deps-analyzer)
[![Dev dependency status](https://david-dm.org/Psychopoulet/used-deps-analyzer/dev-status.svg)](https://david-dm.org/Psychopoulet/used-deps-analyzer?type=dev)
[![Issues](https://img.shields.io/github/issues/Psychopoulet/used-deps-analyzer.svg)](https://github.com/Psychopoulet/used-deps-analyzer/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/used-deps-analyzer.svg)](https://github.com/Psychopoulet/used-deps-analyzer/pulls)

## Installation

```bash
$ npm install used-deps-analyzer
```

## Features

  * Analyse a directory content to find unused installed deps
  * Analyse a directory content to find used uninstalled deps

## Doc

### Content

[check the TypeScript definition file](https://github.com/Psychopoulet/used-deps-analyzer/blob/master/lib/index.d.ts)

## Examples

[check the TypeScript compilation tests](https://github.com/Psychopoulet/used-deps-analyzer/blob/master/test/typescript/compilation.ts)

## Options

  * noDev    : do not use dev deps for comparaison (used files, don't use it to analyze test or build scripts)
  * onlyDev  : use only dev deps for comparaison (test or build scripts, don't use it to analyze used files)
  * overkill : list of deps which should not be used but can be still present for unknown reasons (do not fail, trigger only warnings)

### Run

```js
const usedDepsAnalyzer = require("used-deps-analyzer");

usedDepsAnalyzer("./package.json", "./src", {
	"noDev": true,
	"overkill": [
		"node-promfs"
	],
	"submodules": [
		{
			"module": "colors",
			"call": "colors/safe"
		}
	]
}).then((analyze) => {

	if (analyze.warnings) {

		analyze.warnings.forEach((a) => {
			console.warn(a);
		});

	}

	if (analyze.result) {
		console.log("all ok");
	}
	else {

		analyze.errors.forEach((a) => {
			console.error(a);
		});

	}

}).catch((err) => {
	console.log(err);
});

```

## Tests

```bash
$ npm run-script tests
```

## License

  [ISC](LICENSE)
