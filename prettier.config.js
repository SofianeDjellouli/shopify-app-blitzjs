module.exports = {
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  trailingComma: 'all',
  importOrderSortSpecifiers: true,
  importOrder: ['^@(.*)$'],
  printWidth: 80,
  singleQuote: true,
  semi: false,
}
