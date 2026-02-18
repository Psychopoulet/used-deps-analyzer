// types & interfaces

    // locals
    import type { iOptions, iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkNativesModules (
    extractionResult: readonly iExtractionResult[],
    options?: iOptions
): iResult {

    const warnings: string[] = [];

        const overkill: string[] = options && "object" === typeof options.overkill && options.overkill instanceof Array ? options.overkill : [];

        if (overkill.length) {

            extractionResult.forEach((f: iExtractionResult): undefined => {

                f.modules.forEach((m: string): undefined => {

                    if (overkill.map((o: string): string => {
                        return o.trim();
                    }).includes(m)) {

                        warnings.push(
                            "[OVERKILL] The module \"" + m + "\" used in the file \"" + f.file + "\" may be overkill. You should try to find an alternative."
                        );

                    }

                });

            });

        }

    return {
        "result": true,
        "warnings": warnings,
        "errors": []
    };

}
