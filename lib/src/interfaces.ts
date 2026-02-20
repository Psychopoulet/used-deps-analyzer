export interface iSubModule {
    "module": string;
    "call": string;
}

export interface iOptions {
    "noDev"?: boolean;
    "onlyDev"?: boolean;
    "overkill"?: string[];
    "misscalled"?: iSubModule[];
    "shadows"?: string[];
}

export interface iExtractionResult {
    "file": string;
    "modules": string[];
}

export interface iResult {
    "result": boolean;
    "warnings": string[];
    "errors": string[];
}
