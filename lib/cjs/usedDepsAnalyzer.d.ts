export default function usedDepsAnalyzer(packageFile: string, directoryToAnalyze: string, options: {
    "no-dev": boolean;
    "only-dev": boolean;
    "overkill": boolean;
}): void;
