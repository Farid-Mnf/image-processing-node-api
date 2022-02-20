module.exports = {
    "env": {
        "es2021": true,
        "node": true,
        "jasmine": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jasmine/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "jasmine"
    ],
    "rules": {
        '@typescript-eslint/no-var-requires': 0,
    }
}
