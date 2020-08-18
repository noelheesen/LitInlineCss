import path from 'path'
import sass from '../../src/css-processors/sass'
import readFileSync from '../../src/util/read-file-sync'
import normalizeCSSTestResult from '../../src/util/normalize-css-test-result'

const fixture = (...args: string[]) =>
  path.resolve(__dirname, '..', 'fixtures', 'styles', ...args)

describe('when I want to process sass into css', () => {
  it('matches only s(a|c)ss files', () => {
    const matches = ['x.sass', 'x.scss']
    const mismatches = [
      'x.js',
      'x.sass.js',
      'x.scss.js',
      '.sass.js',
      '.scss.js',
    ]

    const totalCases = matches.length + mismatches.length
    expect.assertions(totalCases)

    for (const file of matches) {
      expect(file.match(sass.test)).toBeTruthy()
    }

    for (const file of mismatches) {
      expect(file.match(sass.test)).toBeFalsy()
    }
  })

  it('processes base.scss', async () => {
    const filename = 'base.scss'
    const absoluteSourcePath = fixture('sass', filename)
    const source = readFileSync(absoluteSourcePath)

    const { css } = await sass.process(source, absoluteSourcePath)

    expect(normalizeCSSTestResult(css)).toMatch(
      /html,body{margin:0;padding:0;}/
    )
  })

  it('provides a set of all unique import references by absolute path', async () => {
    expect.assertions(1)

    const filename = 'with-import.scss'
    const absoluteSourcePath = fixture('sass', filename)
    const source = readFileSync(absoluteSourcePath)

    const { dependencies } = await sass.process(source, absoluteSourcePath)

    const absoluteDependencyPath = fixture('sass', 'is-imported.scss')

    expect(dependencies.has(absoluteDependencyPath)).toBeTruthy()
  })
})
