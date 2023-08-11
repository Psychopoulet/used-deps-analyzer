export interface iOptions {
    "noDev"?: boolean;
    "onlyDev"?: boolean;
    "overkill"?: Array<string>;
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
