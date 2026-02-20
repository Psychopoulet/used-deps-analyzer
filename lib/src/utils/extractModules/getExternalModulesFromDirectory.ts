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

        function _getExternalModulesFromFiles (files: string[]): Promise<iExtractionResult[]> {

            return Promise.all(files.map((file: string): Promise<iExtractionResult> => {

                return getExternalModulesFromFile(file).then((modules: string[]): iExtractionResult => {

                    return {
                        "file": file,
                        "modules": modules
                    };

                });

            }));

        }

        function _getExternalModulesFromDirectories (directories: string[]): Promise<iExtractionResult[]> {

            const result: iExtractionResult[] = [];

            return Promise.all(directories.map((directory: string): Promise<void> => {

                return _getExternalModulesFromDirectory(directory).then((directoryModules: iExtractionResult[]): void => {

                    directoryModules.forEach((dm: iExtractionResult): void => {
                        result.push(dm);
                    });

                });

            })).then((): Promise<iExtractionResult[]> => {

                return Promise.resolve(result);

            });

        }

        function _getExternalModulesFromDirectory (directory: string): Promise<iExtractionResult[]> {

            let result: iExtractionResult[] = [];

            return readdir(directory).then((content: readonly string[]): Promise<iExtractionResult[]> => {

                const files: string[] = [];
                const dirs: string[] = [];

                return Promise.all(content.map((f: string): Promise<void> => {

                    const item: string = join(directory, f);

                    return isFile(item).then((isThisItemAFile: boolean): Promise<void> => {

                        if (isThisItemAFile) {

                            files.push(item);

                            return Promise.resolve();

                        }
                        else {

                            return isDirectory(item).then((isThisItemADirectory: boolean): void => {

                                if (isThisItemADirectory && "node_modules" !== f) {
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
