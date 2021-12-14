module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  'rules': {
    'semi': ['error', 'always'],
    'indent': 'off',
    'no-empty-function': 'off',
    'no-useless-escape': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': ['error', 'before'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'no-template-curly-in-string': 'error',
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': 'error',
    'key-spacing': 'error',
    'func-call-spacing': ['error', 'never'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'space-in-parens': ['error', 'never'],
    'object-curly-spacing': ['error', 'never']
  }
};
