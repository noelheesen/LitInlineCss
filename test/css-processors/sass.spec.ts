import path from 'path'
import sass from '@/css-processors/sass'
import readFileSync from '@/util/read-file-sync'
import normalizeCSSTestResult from '@/util/normalize-css-test-result'

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
    const id = fixture('sass', filename)
    const source = readFileSync(id)

    const { css } = await sass.process(source)

    expect(normalizeCSSTestResult(css)).toMatch(
      /html,body{margin:0;padding:0;}/
    )
  })
})
