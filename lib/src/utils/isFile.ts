// deps

    // natives
    import { lstat, type Stats } from "node:fs";

// module

export default function isFile (file: string): Promise<boolean> {

    return new Promise((resolve: (result: boolean) => void, reject: (err: Error) => void): void => {

        if ("undefined" === typeof file) {
            return reject(new ReferenceError("missing \"file\" argument"));
        }
            else if ("string" !== typeof file) {
                return reject(new TypeError("\"file\" argument is not a string"));
            }
            else if ("" === file.trim()) {
                return reject(new Error("\"file\" argument is empty"));
            }
        else {

            return lstat(file, (err: Error | null, stats: Stats): void => {
                return resolve(Boolean(!err && stats.isFile()));
            });

        }

    });

}
