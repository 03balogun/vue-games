module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'prettier/vue',
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
  ],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
  },
};
