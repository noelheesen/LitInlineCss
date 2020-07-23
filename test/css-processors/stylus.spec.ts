import path from 'path'
import stylus from '../../src/css-processors/stylus'
import readFileSync from '../../src/util/read-file-sync'
import normalizeCSSTestResult from '../../src/util/normalize-css-test-result'

const fixture = (...args: string[]) =>
  path.resolve(__dirname, '..', 'fixtures', 'styles', ...args)

describe('when I want to process stylus into css', () => {
  it('matches only styl(us) files', () => {
    const matches = ['x.styl', 'x.stylus']
    const mismatches = [
      'x.js',
      'x.styl.js',
      'x.stylus.js',
      '.styl.js',
      '.stylus.js',
    ]

    const totalCases = matches.length + mismatches.length
    expect.assertions(totalCases)

    for (const file of matches) {
      expect(file.match(stylus.test)).toBeTruthy()
    }

    for (const file of mismatches) {
      expect(file.match(stylus.test)).toBeFalsy()
    }
  })

  it('processes base.styl', async () => {
    expect.assertions(1)

    const filename = 'base.styl'
    const absoluteSourcePath = fixture('stylus', filename)
    const source = readFileSync(absoluteSourcePath)

    const { css } = await stylus.process(source, absoluteSourcePath)

    expect(normalizeCSSTestResult(css)).toMatch(
      /html,body{margin:0;padding:0;}/
    )
  })
})
