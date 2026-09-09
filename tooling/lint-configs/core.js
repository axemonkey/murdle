import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import-x';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native'; //breaks the config
import pluginPromise from 'eslint-plugin-promise';

const jsRecommendedConfigs = [
	js.configs.recommended,
	{
		name: 'frontend-tooling/eslint-plugin-js-recommended',
		plugins: {
			js,
		}
	}
];

const noUseExtendNativeConfigs = [
	{
		name: 'frontend-tooling/eslint-plugin-no-use-extend-native',
		plugins: {
			'no-use-extend-native': eslintPluginNoUseExtendNative
		},
		rules: {
			'no-use-extend-native/no-use-extend-native': 'error'
		}
	}
];

const unicornConfigs = [
	eslintPluginUnicorn.configs.recommended,
	{
		name: 'frontend-tooling/unicorn',
		rules: {
			// eslint-plugin-unicorn
			// https://github.com/sindresorhus/eslint-plugin-unicorn
			'unicorn/prefer-spread': 'off',
			'unicorn/no-new-buffer': 'off',
			'unicorn/prefer-dom-node-dataset': 'off',
			'unicorn/prefer-dom-node-append': 'off',
			'unicorn/prefer-dom-node-remove': 'off',
			'unicorn/no-array-sort': 'off',
			'unicorn/no-array-reverse': 'off',
			'unicorn/prefer-classlist-toggle': 'off',
			'unicorn/consistent-function-scoping': 'off',
			'unicorn/no-array-method-this-argument': 'off'
		}
	}
];

const importConfigs = [
	{
		name: 'frontend-tooling/import',
		plugins: {
			import: importPlugin
		},
		rules: {
			// eslint-plugin-import
			// https://github.com/benmosher/eslint-plugin-import
			'import/default': 'error',
			'import/export': 'error',
			'import/first': 'error',
			'import/named': 'error',
			'import/namespace': ['error', {
				allowComputed: true
			}],
			'import/no-absolute-path': 'error',
			'import/newline-after-import': 'error',
			'import/no-amd': 'error',
			'import/no-duplicates': 'error',
			'import/no-extraneous-dependencies': 'error',
			'import/no-mutable-exports': 'error',
			'import/no-named-as-default-member': 'error',
			'import/no-named-as-default': 'error',
			'import/no-unresolved': ['error', {
				commonjs: true
			}],
			'import/order': 'error',
			'import/no-unassigned-import': ['error', {
				allow: [
					'babel-polyfill',
					'@babel/polyfill',
					'babel-register',
					'@babel/register'
				]
			}],
		}
	}
];

const promiseConfigs = [
	{
		name: 'frontend-tooling/promise',
		plugins: {
			promise: pluginPromise
		},
		rules: {
			// eslint-plugin-promise
			// https://github.com/xjamundx/eslint-plugin-promise
			'promise/param-names': 'error',
			'promise/no-return-wrap': ['error', {
				allowReject: true
			}],
			'promise/no-return-in-finally': 'error',
		}
	}
];

const coreConfig = [
	{
		name: "frontend-tooling/core/main",
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
		},
		linterOptions: {
			reportUnusedDisableDirectives: "error"
		},
		rules: {
			// Rule for unused variables (e.g. _response)
			"no-unused-vars": [
				"error",
				{
					"args": "all",
					"argsIgnorePattern": "^_",
					"caughtErrors": "all",
					"caughtErrorsIgnorePattern": "^_",
					"destructuredArrayIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"ignoreRestSiblings": true
				}
			]
		}
	},
	...jsRecommendedConfigs,
	...noUseExtendNativeConfigs,
	...unicornConfigs,
	...importConfigs,
	...promiseConfigs
];

export {coreConfig};
