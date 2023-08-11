export interface iSubModule {
    "module": string;
    "call": string;
}
export interface iOptions {
    "noDev"?: boolean;
    "onlyDev"?: boolean;
    "overkill"?: Array<string>;
    "submodules"?: Array<iSubModule>;
}
export interface iExtractionResult {
    "file": string;
    "modules": Array<string>;
}
export interface iResult {
    "result": boolean;
    "warnings": Array<string>;
    "errors": Array<string>;
}
