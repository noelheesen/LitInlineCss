import createAST from '@/util/create-ast'
import findLitElementImport from '@/util/find-lit-element-import'

describe('when I want to retrieve lit-element import information from an AST', () => {
  it('provides defaultSpecifier', () => {
    const source = `import LIT from 'lit-element'`
    const program = createAST(source)

    const litImport = findLitElementImport(program)

    expect(litImport).toMatchObject({
      defaultSpecifier: {
        end: expect.any(Number),
        name: 'LIT',
        start: expect.any(Number),
      },
      namespace: null,
    })
  })

  it('provides namedSpecifier', () => {
    expect.assertions(1)

    const source = `import { LitElement, html } from 'lit-element'`
    const program = createAST(source)

    const litImport = findLitElementImport(program)

    expect(litImport).toMatchObject({
      defaultSpecifier: null,
      namespace: null,
      namedSpecifier: {
        end: expect.any(Number),
        start: expect.any(Number),
      },
    })
  })

  it('provides both defaultSpecifier and namedSpecifier', () => {
    const source = `import LIT, { html } from 'lit-element'`
    const program = createAST(source)

    const litImport = findLitElementImport(program)

    expect(litImport).toMatchObject({
      defaultSpecifier: {
        end: expect.any(Number),
        name: 'LIT',
        start: expect.any(Number),
      },
      namespace: null,
      namedSpecifier: {
        end: expect.any(Number),
        start: expect.any(Number),
      },
    })
  })

  it('provides namespace', () => {
    const source = `import * as LIT from 'lit-element'`
    const program = createAST(source)

    const litImport = findLitElementImport(program)

    expect(litImport).toMatchObject({
      defaultSpecifier: null,
      namespace: 'LIT',
    })
  })
})
