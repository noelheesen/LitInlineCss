const normalizeCSSTestResult = (css: string): string =>
  css.slice().replace(/\n/g, '').replace(/\t/g, '').replace(/\s/g, '')

export default normalizeCSSTestResult
