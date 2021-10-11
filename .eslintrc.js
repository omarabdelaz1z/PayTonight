module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: ["airbnb-base", "prettier"],
  rules: {
    "no-console": 0,
    "no-unused-vars": 1,
    "no-useless-catch": 1,
  },
};
