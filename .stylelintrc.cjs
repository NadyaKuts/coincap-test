const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  plugins: ['stylelint-declaration-strict-value'],
  rules: {
    'color-no-hex': true,
    'color-named': 'never',
    'declaration-block-no-duplicate-properties': true,
    'alpha-value-notation': 'number',
    'color-function-notation': ['legacy', { ignore: ['with-var-inside'] }],
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      {
        message: 'Expected custom property name to be lowerCamelCase',
      },
    ],
    'custom-property-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      {
        message: 'Expected custom property name to be lowerCamelCase',
      },
    ],
    'scale-unlimited/declaration-strict-value': ['color', 'background-color'],
  },
}

module.exports = config
