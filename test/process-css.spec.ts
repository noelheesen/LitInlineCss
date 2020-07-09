import path from 'path'
import processCSS from '@/process-css'
import readFileSync from '@/util/read-file-sync'
import normalizeCSSTestResult from '@/util/normalize-css-test-result'

const fixture = (...args: string[]) =>
  path.resolve(__dirname, 'fixtures', 'styles', ...args)

describe('when I want to process imported CSS', () => {
  it('will use the right processor', async () => {
    const testCases = [
      'css/map.css',
      'less/map.less',
      'sass/map.scss',
      'stylus/map.styl',
    ]

    expect.assertions(testCases.length * 2)

    for (const testCase of testCases) {
      const absoluteSourcePath = fixture(testCase)
      const source = readFileSync(absoluteSourcePath)

      const { css, classmap } = await processCSS(source, absoluteSourcePath)

      expect(normalizeCSSTestResult(css)).toMatch(/\.map{display:block;}/)
      expect(classmap.get('map')).toBe('map')
    }
  })
})
