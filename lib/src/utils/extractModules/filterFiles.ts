// module

export default function filterFiles (f: string): boolean {
    return f.endsWith(".js") || f.endsWith(".cjs") || f.endsWith(".mjs") || f.endsWith(".ts") || f.endsWith(".cts") || f.endsWith(".mts");
}
