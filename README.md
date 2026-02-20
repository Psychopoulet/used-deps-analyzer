# used-deps-analyzer
Analyse js code to force match between installed & used deps

[![Issues](https://img.shields.io/github/issues/Psychopoulet/used-deps-analyzer.svg)](https://github.com/Psychopoulet/used-deps-analyzer/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/used-deps-analyzer.svg)](https://github.com/Psychopoulet/used-deps-analyzer/pulls)
[![Known Vulnerabilities](https://snyk.io/test/github/Psychopoulet/used-deps-analyzer/badge.svg)](https://snyk.io/test/github/Psychopoulet/used-deps-analyzer)

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

  * noDev      | --no-dev     : do not use dev deps for comparaison (used files, don't use it to analyze test or build scripts)
  * onlyDev    | --only-dev   : use only dev deps for comparaison (test or build scripts, don't use it to analyze used files)
  * overkill   | --overkill   : list of deps which should not be used but can be still present for unknown reasons (do not fail, trigger only warnings)
  * misscalled | --misscalled Array<stringified iSubModule> : list of deps which are not called by this name in the code
  * shadows    | --shadows    Array<string>                 : list of deps which are used in the code but not required (to force a sub-dep version for example)

```ts
interface iSubModule {
	"module": string;
	"call": string;
}
```

### Run

```batch
cd ./myProject/ && npx used-deps-analyzer -- "./package.json" "./dir" --no-dev
```

```js
const usedDepsAnalyzer = require("used-deps-analyzer");

usedDepsAnalyzer("./package.json", "./src", {
	"noDev": true,
	"overkill": [
		"node-promfs"
	],
	"misscalled": [
		{
			"module": "colors",
			"call": "colors/safe"
		}
	],
	"shadows": [
		"newer-version",
		"not-called-front-lib"
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
