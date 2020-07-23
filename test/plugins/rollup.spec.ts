import path from 'path'
import { rollup } from 'rollup'
import litInlineCss from '../../src/plugins/rollup'

const fixture = (...partialPaths: string[]) =>
  path.resolve(__dirname, '..', 'fixtures', ...partialPaths)

describe('rollup plugin', () => {
  it('transforms source', async () => {
    const filename = 'import-lit-default.js'
    const absoluteSourcePath = fixture(filename)

    const bundle = await rollup({
      input: absoluteSourcePath,
      plugins: [litInlineCss()],
    })

    const generated = await bundle.generate({})

    expect(generated.output[0].imports).toHaveLength(1)
  })
})
