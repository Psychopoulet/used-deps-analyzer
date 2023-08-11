export interface iExtractionResult {
    "file": string;
    "modules": Array<string>;
}
export default function getExternalModulesFromDirectory(directory: string): Promise<Array<iExtractionResult>>;
