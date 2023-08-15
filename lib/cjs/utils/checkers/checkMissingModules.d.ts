import { iOptions, iExtractionResult, iResult } from "../../interfaces";
export default function checkUnusedModules(extractionResult: Array<iExtractionResult>, dependencies: Array<string>, devDependencies: Array<string>, optionalDependencies: Array<string>, options?: iOptions): iResult;
