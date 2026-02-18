// deps

    // natives
    import { lstat, type Stats } from "node:fs";

// module

export default function isDirectory (directory: string): Promise<boolean> {

    return new Promise((resolve: (result: boolean) => void, reject: (err: Error) => void): void => {

        if ("undefined" === typeof directory) {
            return reject(new ReferenceError("missing \"directory\" argument"));
        }
            else if ("string" !== typeof directory) {
                return reject(new TypeError("\"directory\" argument is not a string"));
            }
            else if ("" === directory.trim()) {
                return reject(new Error("\"directory\" argument is empty"));
            }
        else {

            return lstat(directory, (err: Error | null, stats: Stats): void => {
                return resolve(Boolean(!err && stats.isDirectory()));
            });

        }

    });

}
