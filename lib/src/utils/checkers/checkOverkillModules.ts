// types & interfaces

    // locals
    import type { iOptions, iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkOverkillModules (
    extractionResult: readonly iExtractionResult[],
    options?: iOptions
): iResult {

    const warnings: string[] = [];

        const overkillSet: Set<string> = new Set(
            (options?.overkill instanceof Array ? options.overkill : []).map((o: string): string => {
                return o.trim();
            })
        );

        if (overkillSet.size) {

            extractionResult.forEach((f: iExtractionResult): void => {

                f.modules.forEach((m: string): void => {

                    if (overkillSet.has(m)) {

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
