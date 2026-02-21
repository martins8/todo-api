import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		fileParallelism: false,
		globals: true,
		environment: "node",
		coverage: {
			provider: "v8",
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
