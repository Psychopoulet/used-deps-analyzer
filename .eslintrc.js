module.exports = {
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "env": {
        "es6": true,
        "mocha": true,
        "node": true
    },
    "globals": {
        "after": true,
        "afterEach": true,
        "angular": true,
        "before": true,
        "beforeEach": true,
        "Buffer": true,
        "console": true,
        "clearInterval": true,
        "clearTimeout": true,
        "describe": true,
        "it": true,
        "jQuery": true,
        "Promise": true,
        "Map": true,
        "module": true,
        "os": true,
        "process": true,
        "require": true,
        "setImmediate": true,
        "setInterval": true,
        "setTimeout": true,
        "__dirname": true,
        "__filename": true
    },
    "rules": {
        "for-direction": "error",
        "getter-return": "error",
        "no-await-in-loop": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-empty-character-class": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-parens": "error",
        "no-extra-semi": "error",
        "no-func-assign": "error",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-obj-calls": "error",
        "no-prototype-builtins": "error",
        "no-regex-spaces": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "use-isnan": "error",
        "valid-jsdoc": "error",
        "valid-typeof": "error",


        "accessor-pairs": "error",
        "array-callback-return": "error",
        "block-scoped-var": "error",
        "class-methods-use-this": 0,
        "complexity": "error",
        "consistent-return": "error",
        "curly": "error",
        "default-case": "error",
        "dot-location": [ "error", "property" ],
        "dot-notation": "error",
        "eqeqeq": "error",
        "guard-for-in": "error",
        "no-alert": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-div-regex": "error",
        "no-else-return": 0,
        "no-empty-function": "error",
        "no-empty-pattern": "error",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
        "no-fallthrough": "error",
        "no-floating-decimal": "error",
        "no-global-assign": "error",
        "no-implicit-coercion": "error",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-invalid-this": "error",
        "no-iterator": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-loop-func": "error",
        "no-magic-numbers": 0,
        "no-multi-spaces": "error",
        "no-multi-str": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "error",
        "no-proto": "error",
        "no-redeclare": "error",
        "no-restricted-properties": "error",
        "no-return-assign": "error",
        "no-return-await": "error",
        "no-script-url": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-useless-call": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-warning-comments": "error",
        "no-with": "error",
        "prefer-promise-reject-errors": "error",
        "radix": "error",
        "require-await": "error",
        "vars-on-top": "error",
        "wrap-iife": "error",
        "yoda": [ "error", "always" ],


        "strict": 0,


        "init-declarations": "error",
        "no-catch-shadow": "error",
        "no-delete-var": "error",
        "no-label-var": "error",
        "no-restricted-globals": "error",
        "no-shadow": "error",
        "no-shadow-restricted-names": "error",
        "no-undef": "error",
        "no-undef-init": "error",
        "no-undefined": "error",
        "no-unused-vars": "error",
        "no-use-before-define": "error",


        "callback-return": "error",
        "global-require": 0,
        "handle-callback-err": "error",
        "no-buffer-constructor": "error",
        "no-mixed-requires": "error",
        "no-new-require": "error",
        "no-path-concat": "error",
        "no-process-env": "error",
        "no-process-exit": "error",
        "no-restricted-modules": "error",
        "no-sync": "error",


        "array-bracket-newline": "error",
        "array-bracket-spacing": [ "error", "always" ],
        "array-element-newline": [ "error", "consistent" ],
        "block-spacing": "error",
        "brace-style": [ "error", "stroustrup" ],
        "camelcase": "error",
        "capitalized-comments": 0,
        "comma-dangle": [ "error", "never" ],
        "comma-spacing": [ "error", { "before": false, "after": true } ],
        "comma-style": [ "error", "last" ],
        "computed-property-spacing": [ "error", "never" ],
        "consistent-this": "error",
        "eol-last": "error",
        "func-call-spacing": "error",
        "func-name-matching": "error",
        "func-names": "error",
        "func-style": [ "error", "declaration" ],
        "id-blacklist": 0,
        "id-length": 0,
        "id-match": 0,
        "indent": 0,
        "jsx-quotes": [ "error", "prefer-double" ],
        "key-spacing": [ "error", { "beforeColon": false, "afterColon": true } ],
        "keyword-spacing": [ "error", { "after": true, "before": true } ],
        "line-comment-position": 0,
        "linebreak-style": 0,
        "lines-around-comment": "error",
        "max-depth": [ "error", 4 ],
        "max-len": [ "error", 150 ],
        "max-lines": [ "error", { "max": 500, "skipComments": true } ],
        "max-nested-callbacks": [ "error", 5 ],
        "max-params": [ "error", 4 ],
        "max-statements": [ "error", 25 ],
        "max-statements-per-line": [ "error", { "max": 2 } ],
        "multiline-ternary": 0,
        "new-cap": "error",
        "new-parens": "error",
        "newline-per-chained-call": 0,
        "no-array-constructor": "error",
        "no-bitwise": [ "error", { "allow": [ "^" ] } ],
        "no-continue": "error",
        "no-inline-comments": 0,
        "no-lonely-if": "error",
        "no-mixed-operators": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-multi-assign": "error",
        "no-multiple-empty-lines": "error",
        "no-negated-condition": 0,
        "no-nested-ternary": "error",
        "no-new-object": "error",
        "no-plusplus": 0,
        "no-restricted-syntax": "error",
        "no-tabs": [ "error", { "allowIndentationTabs": true } ],
        "no-ternary": 0,
        "no-trailing-spaces": "error",
        "no-underscore-dangle": 0,
        "no-unneeded-ternary": "error",
        "no-whitespace-before-property": "error",
        "nonblock-statement-body-position": [ "error", "below" ],
        "object-curly-newline": [ "error", { "consistent": true } ],
        "object-curly-spacing": [ "error", "always" ],
        "object-property-newline": "error",
        "one-var": [ "error", "never" ],
        "one-var-declaration-per-line": "error",
        "operator-assignment": [ "error", "always" ],
        "operator-linebreak": [ "error", "after" ],
        "padded-blocks": ["error", { "classes": "always", "switches": "always" } ],
        "padding-line-between-statements": "error",
        "quote-props": [ "error", "always" ],
        "quotes": [ "error", "double" ],
        "require-jsdoc": "error",
        "semi": [ "error", "always" ],
        "semi-spacing": [ "error", { "before": false, "after": true } ],
        "semi-style": [ "error", "last" ],
        "sort-keys": 0,
        "sort-vars": "error",
        "space-before-blocks": [ "error", "always" ],
        "space-before-function-paren": [ "error", "always" ],
        "space-in-parens": [ "error", "never" ],
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "spaced-comment": [ "error", "always" ],
        "switch-colon-spacing": [ "error", { "after": true, "before": false } ],
        "template-tag-spacing": [ "error", "always" ],
        "unicode-bom": 0,
        "wrap-regex": "error",


        "arrow-body-style": [ "error", "always" ],
        "arrow-parens": [ "error", "always" ],
        "arrow-spacing": ["error", { "before": true, "after": true } ],
        "constructor-super": "error",
        "generator-star-spacing": [ "error", { "before": true, "after": false } ],
        "no-class-assign": "error",
        "no-confusing-arrow": "error",
        "no-const-assign": "error",
        "no-dupe-class-members": "error",
        "no-duplicate-imports": "error",
        "no-new-symbol": "error",
        "no-restricted-imports": 0,
        "no-this-before-super": "error",
        "no-useless-computed-key": "error",
        "no-useless-constructor": "error",
        "no-useless-rename": "error",
        "no-var": "error",
        "object-shorthand": 0,
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-destructuring": "error",
        "prefer-numeric-literals": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": 0,
        "require-yield": "error",
        "rest-spread-spacing": [ "error", "never" ],
        "sort-imports": "error",
        "symbol-description": "error",
        "template-curly-spacing": "error",
        "yield-star-spacing": [ "error", { "before": true, "after": false } ]

    }
};