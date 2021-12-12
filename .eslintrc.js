{
  root: true,
  env: {
    es2020: true,
    jasmine: true,
    jest: true,
    node: true
  },
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2021,
    createDefaultProgram: true,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  settings: {
    noInlineConfig: true,
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    node: {
      allowModules: ['electron'],
      resolvePaths: [__dirname],
      tryExtensions: ['.js', '.ts'],
    },
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:node/recommended",
    "airbnb-base",
    "prettier"
  ],
  "rules": {
    "import/extensions": "off",
    "linebreak-style": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/rule-name": "error",
    "@typescript-eslint/no-explicit-any": "error",
    // 'tsdoc/syntax': 'error',
    '@typescript-eslint/no-explicit-any': ['error']
  }
}
