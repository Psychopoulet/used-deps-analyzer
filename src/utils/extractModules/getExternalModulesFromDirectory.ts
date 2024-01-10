// deps

    // natives
    import { join } from "node:path";
    import { readdir } from "node:fs/promises";

    // locals

    import isFile from "../isFile";
    import isDirectory from "../isDirectory";
    import filterFiles from "./filterFiles";

    import getExternalModulesFromFile from "./getExternalModulesFromFile";

// types & interfaces

    import type { iExtractionResult } from "../../interfaces";

// private

    // methods

        function _getExternalModulesFromFiles (files: string[], result: iExtractionResult[] = []): Promise<iExtractionResult[]> {

            return !files.length ? Promise.resolve(result) : Promise.resolve().then((): Promise<void> => {

                const file: string = files.shift() as string;

                return getExternalModulesFromFile(file).then((modules: string[]): void => {

                    if (modules.length) {

                        result.push({
                            "file": file,
                            "modules": modules
                        });

                    }

                });

            // loop
            }).then((): Promise<iExtractionResult[]> => {

                return _getExternalModulesFromFiles(files, result);

            });

        }

        function _getExternalModulesFromDirectories (directories: string[], result: iExtractionResult[] = []): Promise<iExtractionResult[]> {

            return !directories.length ? Promise.resolve(result) : Promise.resolve().then((): Promise<void> => {

                const directory: string = directories.shift() as string;

                return _getExternalModulesFromDirectory(directory).then((directoryModules: iExtractionResult[]): void => {

                    directoryModules.forEach((dm) => {
                        result.push(dm);
                    });

                });

            // loop
            }).then((): Promise<iExtractionResult[]> => {

                return _getExternalModulesFromDirectories(directories, result);

            });

        }

        function _getExternalModulesFromDirectory (directory: string): Promise<iExtractionResult[]> {

            let result: iExtractionResult[] = [];

            return readdir(directory).then((content: readonly string[]): Promise<iExtractionResult[]> => {

                const files: string[] = [];
                const dirs: string[] = [];

                return Promise.all(content.map((f: string): Promise<void> => {

                    const item: string = join(directory, f);

                    return isFile(item).then((isThisItemAFile: boolean): Promise<void> | void => {

                        if (isThisItemAFile) {
                            files.push(item);
                        }
                        else {

                            return isDirectory(item).then((isThisItemADirectory: boolean): void => {

                                if (isThisItemADirectory) {
                                    dirs.push(item);
                                }

                            });

                        }

                    });

                })).then((): Promise<void> => {

                    return _getExternalModulesFromFiles(files.filter(filterFiles)).then((filesModules: readonly iExtractionResult[]): void => {

                        if (filesModules.length) {
                            result = [ ...result, ...filesModules ];
                        }

                    });

                }).then((): Promise<void> => {

                    return _getExternalModulesFromDirectories(dirs).then((directoriesModules: readonly iExtractionResult[]): void => {

                        if (directoriesModules.length) {
                            result = [ ...result, ...directoriesModules ];
                        }

                    });

                }).then((): Promise<iExtractionResult[]> => {

                    return Promise.resolve(result);

                });

            });

        }

// module

export default function getExternalModulesFromDirectory (directory: string): Promise<iExtractionResult[]> {

    return _getExternalModulesFromDirectory(directory);

}
