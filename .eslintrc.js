module.exports = {
    root: true,
    sourceType: module,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaVersion: 2017,
    },
    extends: ['prettier', 'plugin:prettier/recommended'],
    plugins: [],
    // add your custom rules here
    rules: { indent: ['error', 4] },
}
