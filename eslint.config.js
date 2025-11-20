import { coreConfig, browserConfig } from "@springernature/eslint-config";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: [coreConfig],
		languageOptions: {
			globals: { ...globals.browser },
		},
		rules: {
			// custom rules
		},
	},
	{
		files: ["src/assets/js/**/*.js"],
		extends: [browserConfig],
		rules: {
			// custom rules
		},
	},
]);
