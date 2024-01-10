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

            // extract "require" modules (node)
            if (standardized.includes("require(\"")) {
                lines.push(standardized);
            }

            // extract "import" modules (TS)
            else if (standardized.includes("import ") && (
                (standardized.endsWith("\";") || standardized.endsWith("\");"))
            )) {
                lines.push(standardized);
            }

            // extract not required modules (read specific absolute file)
            else if (standardized.includes("\"node_modules\"")) {

                const path: Array<string> = standardized.split(",");
                const nodeModulesFoundAt: number = path.findIndex((data: string): boolean => {
                    return "\"node_modules\"" === data.trim();
                });

                if (-1 < nodeModulesFoundAt && path[nodeModulesFoundAt + 1]) {
                    lines.push("require(\"" + path[nodeModulesFoundAt + 1].trim().replace(/"/g, "") + "\")");
                }

            }

            // extract not required modules (read specific relative file)
            else if (standardized.includes("node_modules/")) {

                const path: Array<string> = standardized.split("/");
                const nodeModulesFoundAt: number = path.findIndex((data: string): boolean => {
                    return "node_modules" === data.trim();
                });

                if (-1 < nodeModulesFoundAt && path[nodeModulesFoundAt + 1]) {
                    lines.push("require(\"" + path[nodeModulesFoundAt + 1].trim() + "\")");
                }

            }

        }).on("close", (): void => {
            resolve(lines);
        });

    // extract modules
    }).then((lines: Array<string>): Array<string> => {

        // remove useless path format
        return lines.map((l: string): string => {

            const reg: RegExp = l.includes("join(") ? /join\((.*)\)/ : /"(.*)"/;

            const extract: Array<string> = l.match(reg) || [ "" ];

            return 1 < extract.length ? extract[1] : "";

        // avoid empty strings
        }).filter((m: string): boolean => {

            return "" !== m && (1 < m.length || /^[a-zA-Z]{1}$/.test(m));

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

                if (-1 < findModulesDirAt && parts[findModulesDirAt + 1]) {
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

}
