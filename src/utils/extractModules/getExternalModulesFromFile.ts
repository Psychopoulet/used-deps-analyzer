"use strict";

// deps

	// natives
	import readline from "node:readline";
	import { createReadStream } from "node:fs";

// module

export default function getExternalModulesFromFile (file: string): Promise<Array<string>> {

	// extract "require" lines
	return new Promise((resolve: (lines: Array<string>) => void): void => {

		const lines: Array<string> = [];

		readline.createInterface({
			"input": createReadStream(file, "utf-8"),
			"crlfDelay": Infinity
		}).on("line", (line: string): void => {

			if (line.includes("require(\"")) {
				lines.push(line.trim());
			}
			else if (line.includes("import ") && line.endsWith("\";")) {
				lines.push(line.trim());
			}

		}).on("close", (): void => {
			resolve(lines);
		});

	// extract modules
	}).then((lines: Array<string>): Array<string> => {

		return lines.map((l: string): string => {

			const extract: Array<string> = l.match(/"(.*)"/) || [ "" ];

			return 1 < extract.length ? extract[1] : "";

		}).filter((l: string): boolean => {
			return "" !== l;
		});

	// filters
	}).then((modules: Array<string>): Promise<Array<string>> => {

		return Promise.resolve(

			// remove duplicates
			[
				...new Set(

					modules

						// filter non-native modules
						.filter((m: string): boolean => {
							return !m.startsWith("node:");
						})

						// filter local modules
						.filter((m: string): boolean => {
							return !m.includes("./");
						})

				)
			]

		);

	});

};
