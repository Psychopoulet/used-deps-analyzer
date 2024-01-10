import type { iOptions, iExtractionResult, iResult } from "../../interfaces";
export default function checkUnusedModules(extractionResult: readonly iExtractionResult[], dependencies: readonly string[], devDependencies: readonly string[], optionalDependencies: readonly string[], options?: iOptions): iResult;
