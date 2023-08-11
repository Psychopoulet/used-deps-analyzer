import { iOptions } from "./interfaces";
export interface iResult {
    "result": boolean;
    "warnings": Array<string>;
    "errors": Array<string>;
}
export default function usedDepsAnalyzer(packageFile: string, directoryToAnalyze: string, options?: iOptions): Promise<iResult>;
