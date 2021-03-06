module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'node/no-unsupported-features/es-syntax': 0,
    'comma-dangle': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'space-before-function-paren': 0,
    'no-use-before-define': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'operator-linebreak': 0,
    'prefer-destructuring': 0
  },
  env: {
    browser: true
  }
};
