import path from 'path'
import less from '../../src/css-processors/less'
import readFileSync from '../../src/util/read-file-sync'
import normalizeCSSTestResult from '../../src/util/normalize-css-test-result'

const fixture = (...args: string[]) =>
  path.resolve(__dirname, '..', 'fixtures', 'styles', ...args)

describe('when I want to process less into css', () => {
  it('matches only s(a|c)ss files', () => {
    const matches = ['x.less']
    const mismatches = ['x.js', 'x.less.js', '.less.js']

    const totalCases = matches.length + mismatches.length
    expect.assertions(totalCases)

    for (const file of matches) {
      expect(file.match(less.test)).toBeTruthy()
    }

    for (const file of mismatches) {
      expect(file.match(less.test)).toBeFalsy()
    }
  })

  it('processes base.less', async () => {
    expect.assertions(1)

    const filename = 'base.less'
    const absoluteSourcePath = fixture('less', filename)
    const source = readFileSync(absoluteSourcePath)

    const { css } = await less.process(source)

    expect(normalizeCSSTestResult(css)).toMatch(
      /html,body{margin:0;padding:0;}/
    )
  })
})
