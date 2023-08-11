export interface iResult {
    "result": boolean;
    "warnings": Array<string>;
    "errors": Array<string>;
}
export default function usedDepsAnalyzer(packageFile: string, directoryToAnalyze: string, options?: {
    "noDev"?: boolean;
    "onlyDev"?: boolean;
    "overkill"?: Array<string>;
}): Promise<iResult>;
