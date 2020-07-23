import path from 'path'
import postcss from '../../src/css-processors/postcss'
import readFileSync from '../../src/util/read-file-sync'
import normalizeCSSTestResult from '../../src/util/normalize-css-test-result'

const fixture = (...args: string[]) =>
  path.resolve(__dirname, '..', 'fixtures', 'styles', ...args)

describe('when I want to process css with postcss', () => {
  it('processes base.css', async () => {
    expect.assertions(1)

    const filename = 'base.css'
    const absoluteSourcePath = fixture('css', filename)
    const source = readFileSync(absoluteSourcePath)

    const { css } = await postcss.process(source, absoluteSourcePath)

    expect(normalizeCSSTestResult(css)).toMatch(
      /html,body{margin:0;padding:0;}/
    )
  })

  it('provides mapped classes', async () => {
    expect.assertions(2)

    const filename = 'map.css'
    const absoluteSourcePath = fixture('css', filename)
    const source = readFileSync(absoluteSourcePath)

    const { classmap } = await postcss.process(source, absoluteSourcePath)

    expect(classmap.size).toBe(1)
    expect(classmap.get('map')).toBe('map')
  })
})
