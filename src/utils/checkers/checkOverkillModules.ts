// types & interfaces

    // locals
    import type { iOptions, iExtractionResult, iResult } from "../../interfaces";

// module

export default function checkNativesModules (
    extractionResult: readonly iExtractionResult[],
    options?: iOptions
): iResult {

    const warnings: string[] = [];

        if (options && options.overkill && "object" === typeof options.overkill && options.overkill instanceof Array && options.overkill.length) {

            extractionResult.forEach((f: iExtractionResult): void => {

                f.modules.forEach((m: string): void => {

                    if ((options.overkill as string[]).map((o: string): string => {
                        return o.trim();
                    }).includes(m)) {

                        warnings.push(
                            "[OVERKILL] The module \"" + m + "\" used it the file \"" + f.file + "\" may be overkill. You should try to find an alternative."
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
