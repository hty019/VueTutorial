module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
      'prettier',
    '@vue/typescript/recommended'
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'prettier/prettier':[
        'error',
      {
        singleQuote: true,
        semi:true,
        useTabs:true,
        tabWidth:2,
        trailingComma:'all',
        printWidth:80,
        bracketSpacing:true,
        arrowParens:'avoid',
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
