module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "react/jsx-filename-extension": 'off',
    "no-console": "off",
    "no-alert": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "radix": "off",
    "react/destructuring-assignment": "off",
    "react/prop-types": "off"
  },
};
