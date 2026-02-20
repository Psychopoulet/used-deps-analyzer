// types & interfaces

    // locals
    import type { iOptions, iSubModule, iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkUnusedModules (
    extractionResult: readonly iExtractionResult[],
    dependencies: readonly string[],
    devDependencies: readonly string[],
    options?: iOptions
): iResult {

    let result = true;
    const errors: string[] = [];

        const usedDepsSet: Set<string> = new Set<string>();

            const misscalled: iSubModule[] = options?.misscalled instanceof Array ? options.misscalled : [];

            extractionResult.forEach((f: iExtractionResult): void => {

                f.modules.map((m: string): string => {

                    let originalModule: string = m;

                        if (misscalled.length) {

                            const converter: iSubModule | undefined = misscalled.find((submodule: iSubModule): boolean => {
                                return m === submodule.call;
                            });

                            if (converter) {
                                originalModule = converter.module;
                            }

                        }

                    return originalModule;

                }).forEach((m: string): void => {
                    usedDepsSet.add(m);
                });

            });

        const shadowsSet: Set<string> = new Set(
            options?.shadows instanceof Array ? options.shadows : []
        );

        if ("object" !== typeof options || "boolean" !== typeof options.onlyDev || !options.onlyDev) {

            dependencies.forEach((dep: string): void => {

                if (!usedDepsSet.has(dep) && !shadowsSet.has(dep)) {

                    errors.push(
                        "[UNUSED] The installed module \"" + dep + "\" is not used in code"
                    );

                    result = false;

                }

            });

        }

        if ("object" !== typeof options || "boolean" !== typeof options.noDev || !options.noDev) {

            devDependencies.forEach((dep: string): void => {

                if (!usedDepsSet.has(dep) && !shadowsSet.has(dep)) {

                    errors.push(
                        "[UNUSED - DEV] The installed module \"" + dep + "\" is not used in code"
                    );

                    result = false;

                }

            });

        }

    return {
        "result": result,
        "warnings": [],
        "errors": errors
    };

}
