"use strict";

// module

export default function filterFiles (f: string): boolean {
	return f.endsWith(".js") || f.endsWith(".cjs") || f.endsWith(".ts") || f.endsWith(".cts");
};
