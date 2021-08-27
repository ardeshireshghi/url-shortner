/** @type import('@types/eslint').Linter.Config */
const config = {
  parserOptions: {
    project: ['./tsconfig.json']
  },
  extends: ['airbnb'],
  rules: {
    'no-console': 0,
    indent: ['off']
    // tsconfig taking care of thos
  }
};

module.exports = config;
