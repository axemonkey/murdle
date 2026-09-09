export default {
    plugins: [
        "stylelint-order"
    ],
    extends: ["stylelint-config-recommended-scss"],
    rules: {
        // Turning off rules from stylelint-config-recommended-scss
        "no-descending-specificity": null,
        "no-duplicate-selectors": null,
        "scss/at-extend-no-missing-placeholder": null,
        // Springer Nature Ruleset
        "at-rule-empty-line-before": [
            "always",  {
                "except": [
                    "inside-block"
                ],
                "ignore": [
                    "after-comment",
                    "inside-block",
                    "blockless-after-same-name-blockless"
                ]
            }
        ],
        "block-no-empty": true,
        "color-hex-length": "short",
        "color-no-invalid-hex": true,
        "font-family-name-quotes": "always-unless-keyword",
        "function-name-case": "lower",
        "function-url-quotes": [
            "always",
            {
                "except": [
                    "empty"
                ]
            }
        ],
        "length-zero-no-unit": true,
        "max-nesting-depth": 3,
        "media-feature-range-notation": "prefix",
        "order/order": [
            {
                "type": "at-rule",
                "name": "extend"
            },
            "declarations"
        ],
        "scss/load-no-partial-leading-underscore": true,
        "selector-no-qualifying-type": [
            true,
            {
                "ignore": [
                    "attribute",
                    "class"
                ]
            }
        ]
    },
};
