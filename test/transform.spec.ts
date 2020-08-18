import path from 'path'
import transform from '../src/transform'
import readFileSync from '../src/util/read-file-sync'

const fixture = (...partialPaths: string[]) =>
  path.resolve(__dirname, 'fixtures', ...partialPaths)

/**
 * given an input <source> it will
 * 1. inline all imported css wrapped in the lit-element css function as a template literal
 * 2. replace all references to the imported css object by it's values.
 */
describe('transformer', () => {
  it('throws when the source does not import lit-element', async () => {
    expect.assertions(1)

    const filename = 'does-not-import-lit-element.js'
    const absoluteSourcePath = fixture(filename)
    const source = readFileSync(absoluteSourcePath)

    await expect(transform(source, absoluteSourcePath)).rejects.toThrow()
  })

  it('appends named css import to lit-element with default import', async () => {
    expect.assertions(2)

    const filename = 'import-lit-default.js'
    const absoluteSourcePath = fixture(filename)
    const source = readFileSync(absoluteSourcePath)

    const { js } = await transform(source, absoluteSourcePath)

    expect(js).toMatch("import LIT, { css } from 'lit-element'")
    expect(js).toMatchSnapshot('import-lit-default')
  })

  it('appends css import to lit-element with named import', async () => {
    expect.assertions(2)

    const filename = 'import-lit-named.js'
    const absoluteSourcePath = fixture(filename)
    const source = readFileSync(absoluteSourcePath)

    const { js } = await transform(source, absoluteSourcePath)

    expect(js).toMatch("import { LitElement, html, css } from 'lit-element'")
    expect(js).toMatchSnapshot('import-lit-named')
  })

  it('appends named css import to lit-element with default and named import', async () => {
    expect.assertions(2)

    const filename = 'import-lit-default-named.js'
    const absoluteSourcePath = fixture(filename)
    const source = readFileSync(absoluteSourcePath)

    const { js } = await transform(source, absoluteSourcePath)

    expect(js).toMatch("import LIT, { html, css } from 'lit-element'")
    expect(js).toMatchSnapshot('import-lit-default-named')
  })

  it('does not append named css import when lit-element import is namespaced', async () => {
    expect.assertions(2)

    const filename = 'import-lit-namespaced.js'
    const absoluteSourcePath = fixture(filename)
    const source = readFileSync(absoluteSourcePath)

    const { js } = await transform(source, absoluteSourcePath)

    expect(js).toMatch("import * as LIT from 'lit-element'")
    expect(js).toMatchSnapshot('import-lit-namespaced')
  })

  describe('inlining stylesheet', () => {
    it('is a single assignment', async () => {
      expect.assertions(2)

      const filename = 'import-css-single.js'
      const absoluteSourcePath = fixture(filename)
      const source = readFileSync(absoluteSourcePath)

      const { js } = await transform(source, absoluteSourcePath)

      expect(js).toMatch(/\.styles\s=\scss`\.map/g)
      expect(js).toMatchSnapshot('inline-stylesheet-single-prototype')
    })

    it('is a member of an array assignment', async () => {
      expect.assertions(2)

      const filename = 'import-css-multi-prototype.js'
      const absoluteSourcePath = fixture(filename)
      const source = readFileSync(absoluteSourcePath)

      const { js } = await transform(source, absoluteSourcePath)

      expect(js).toMatch(/\.styles\s=\s\[css`(.|\s)+`, css`(.|\s)+`\]/g)
      expect(js).toMatchSnapshot('inline-stylesheet-multi-prototype')
    })
  })

  it('removes css import expression', async () => {
    expect.assertions(2)

    const filename = 'import-css-single.js'
    const absoluteSourcePath = fixture(filename)
    const source = readFileSync(absoluteSourcePath)

    const { js } = await transform(source, absoluteSourcePath)

    expect(js).not.toMatch(
      /import\s(.)+\sfrom\s('|")(.)+\.(css|sass|scss|styl(us)?|less)('|")/g
    )
    expect(js).toMatchSnapshot('remove-css-import-expression')
  })

  describe('replace references', () => {
    it('replaces references in object properties', async () => {
      expect.assertions(2)

      const filename = 'classmap-static-ref.js'
      const absoluteSourcePath = fixture(filename)
      const source = readFileSync(absoluteSourcePath)

      const { js } = await transform(source, absoluteSourcePath)

      expect(js).toMatch(
        /const classes\s=\s{(\n|\s|\r)+'a':\strue,(\n|\s|\r)+'a-b':\strue,(\n|\s|\r)+}/g
      )
      expect(js).toMatchSnapshot('classmap-static-ref')
    })

    it('in dynamic object specified in classMap', async () => {
      expect.assertions(2)

      const filename = 'classmap-element.js'
      const absoluteSourcePath = fixture(filename)
      const source = readFileSync(absoluteSourcePath)

      const { js } = await transform(source, absoluteSourcePath)

      expect(js).toMatch(
        /const classes\s=\sclassMap\({(\n|\s|\r)+'a':\strue,(\n|\s|\r)+'a-b':\strue,(\n|\s|\r)+}\)/g
      )
      expect(js).toMatchSnapshot('classmap-element')
    })

    it('in dynamic object inlined in classmap', async () => {
      expect.assertions(2)

      const filename = 'classmap-inline.js'
      const absoluteSourcePath = fixture(filename)
      const source = readFileSync(absoluteSourcePath)

      const { js } = await transform(source, absoluteSourcePath)

      expect(js).toMatch(
        /class=\${classMap\({(\n|\r|\s)+('|")a('|"):\strue,(\n|\r|\s)+('|")a-b('|"):\strue,(\n|\r|\s)+}\)}/g
      )
      expect(js).toMatchSnapshot('classmap-inline')
    })
  })
})
