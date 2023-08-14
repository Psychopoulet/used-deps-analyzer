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

			const standardized: string = line.trim().replace(/'/g, "\"").replace(/\\/g, "/");

			if (standardized.includes("require(\"")) {
				lines.push(standardized);
			}
			else if (standardized.includes("import ") && (
				(standardized.endsWith("\";") || standardized.endsWith("\");"))
			)) {
				lines.push(standardized);
			}

		}).on("close", (): void => {
			resolve(lines);
		});

	// extract modules
	}).then((lines: Array<string>): Array<string> => {

		return lines.map((l: string): string => {

			const reg: RegExp = l.includes("join(") ? /join\((.*)\)/ : /"(.*)"/;

			const extract: Array<string> = l.match(reg) || [ "" ];

			return 1 < extract.length ? extract[1] : "";

		}).filter((m: string): boolean => {
			return "" !== m;
		}).map((m: string): string => {

			let separator: "/" | "," | "" = "";
			if (m.includes(",")) {
				separator = ",";
			}
			else if (m.includes("/")) {
				separator = "/";
			}

			if (separator) {

				const parts: Array<string> = m.replace(/"/g, "").split(separator).map((s: string): string => {
					return s.trim();
				});

				const findModulesDirAt: number = parts.findIndex((p: string): boolean => {
					return "node_modules" === p;
				});

				if (-1 < findModulesDirAt && findModulesDirAt < parts.length) {
					return parts[findModulesDirAt + 1];
				}
				else {
					return m;
				}

			}
			else {
				return m;
			}

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
