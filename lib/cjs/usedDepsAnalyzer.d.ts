import type { iOptions } from "./interfaces";
export interface iResult {
    "result": boolean;
    "warnings": string[];
    "errors": string[];
}
export default function usedDepsAnalyzer(packageFile: string, directoryToAnalyze: string, options?: iOptions): Promise<iResult>;
