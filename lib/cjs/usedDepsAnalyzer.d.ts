interface iResult {
    "result": boolean;
    "warnings": Array<string>;
    "errors": Array<string>;
}
export default function usedDepsAnalyzer(packageFile: string, directoryToAnalyze: string, options: {
    "no-dev": boolean;
    "only-dev": boolean;
    "overkill": boolean;
}): Promise<iResult>;
export {};
