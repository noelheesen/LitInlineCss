import path from 'path'
import createAST from '@/util/create-ast'
import readFileSync from '@/util/read-file-sync'
import loadCSS from '@/load-css'

const fixture = (...args: string[]) =>
  path.resolve(__dirname, 'fixtures', ...args)

describe('when I want to load css import statements', () => {
  it('does not load lit-element', async () => {
    expect.assertions(5)
    const filename = 'with-extension.js'
    const absoluteSourcePath = fixture('load-css', filename)
    const source = readFileSync(absoluteSourcePath)
    const AST = createAST(source)
    const result = await loadCSS(AST, absoluteSourcePath)
    for (const r of result) {
      expect(r.raw).toBeTruthy()
    }
    expect(result.size).toBe(4)
  })

  it('resolves imports from node modules', async () => {
    expect.assertions(1)

    const filename = 'node-modules.js'
    const absoluteSourcePath = fixture('load-css', filename)
    const source = readFileSync(absoluteSourcePath)
    const AST = createAST(source)

    const cssImports = await loadCSS(AST, absoluteSourcePath)

    for (const cssImport of cssImports) {
      expect(cssImport.absolutePath).toMatch('/node_modules/reset-css-complete')
    }
  })

  it('resolves mapped source values', async () => {
    expect.assertions(1)

    const filename = 'mapped-source.js'
    const absoluteSourcePath = fixture('load-css', filename)
    const source = readFileSync(absoluteSourcePath)
    const AST = createAST(source)

    const cssImports = await loadCSS(AST, absoluteSourcePath, {
      moduleNameMappings: {
        '@/': 'src/',
      },
    })

    for (const cssImport of cssImports) {
      expect(cssImport.absolutePath).toMatch(
        'test/fixtures/styles/css/base.css'
      )
    }
  })
})
