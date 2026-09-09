import { coreConfig } from './tooling/lint-configs/core.js';
import { browserConfig } from './tooling/lint-configs/browser.js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
	{
		files: ['**/*.js'],
		extends: [coreConfig],
		languageOptions: {
			globals: { ...globals.browser },
		},
		rules: {
			'comma-dangle': ['warn', 'always'],
		},
	},
	{
		files: ['src/assets/js/**/*.js'],
		extends: [browserConfig],
		rules: {
			// custom rules
		},
	},
]);
