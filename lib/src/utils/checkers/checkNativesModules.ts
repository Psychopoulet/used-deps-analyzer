// deps

    // locals
    import natives from "./natives";

// types & interfaces

    // locals
    import type { iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkNativesModules (extractionResult: readonly iExtractionResult[]): iResult {

    const nativesSet: Set<string> = new Set(natives);

    const warnings: string[] = [];

        extractionResult.forEach((f: iExtractionResult): void => {

            const notRewritten: string[] = f.modules.filter((m: string): boolean => {
                return nativesSet.has(m);
            });

            if (notRewritten.length) {

                notRewritten.forEach((m: string): void => {

                    warnings.push(
                        "[NATIVE] The module \"" + m + "\" used in the file \"" + f.file + "\" does not have the valid syntax. Please use \"node:\" as prefix"
                    );

                });

            }

        });

    return {
        "result": true,
        "warnings": warnings,
        "errors": []
    };

}
