module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
    babelOptions: {
      configFile: "./babel.config.js",
    },
  },
  plugins: ["prettier"],
  extends: ["airbnb-base", "prettier"],
  rules: {
    "no-console": 0,
    "no-unused-vars": 1,
    "no-useless-catch": 1,
  },
};
