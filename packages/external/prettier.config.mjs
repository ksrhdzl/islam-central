/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  tabWidth: 2,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson',
  ],
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '', '^[./]', '^[../]'],
  importOrderParserPlugins: ['typescript', 'decorators'],
};
