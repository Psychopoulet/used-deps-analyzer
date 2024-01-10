// deps

    // locals
    import natives from "./natives";

// types & interfaces

    // locals
    import type { iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkNativesModules (extractionResult: readonly iExtractionResult[]): iResult {

    const warnings: string[] = [];

        extractionResult.forEach((f: iExtractionResult): undefined => {

            const notRewritten: string[] = f.modules.filter((m: string): boolean => {
                return natives.includes(m);
            });

            if (notRewritten.length) {

                notRewritten.forEach((m: string): undefined => {

                    warnings.push(
                        "[NATIVE] The module \"" + m + "\" used it the file \"" + f.file + "\" does not have the valid syntax. Please use \"node:\" as prefix"
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
