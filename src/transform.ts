import * as walk from 'acorn-walk'
import MagicString from 'magic-string'
import inlineStylesheet from './mutators/inline-stylesheet'
import removeImport from './mutators/remove-import'
import replaceReferences from './mutators/replace-references'
import createAST from './util/create-ast'
import findLitElementImport from './util/find-lit-element-import'
import immutable from './util/immutable'
import loadCSS from './load-css'
import processCSS from './process-css'
import type { DynamicAcornNode, LitInlineCSSResult, CSSResult } from './types'

/**
 * core transformer that loads all CSS imports and inlines them.
 * @param context transformer context
 * @param input raw TS/JS input
 */
const transform = async (
  source: string,
  absoluteSourcePath: string,
  options?: {
    moduleNameMappings?: Record<string, string>
    rootDir?: string
  }
): Promise<LitInlineCSSResult> => {
  const AST = createAST(source)
  const litImport = findLitElementImport(AST)
  const css = new Set<Readonly<CSSResult>>()

  if (!litImport) {
    throw new Error('module does not import lit-element')
  }

  const cssImports = await loadCSS(AST, absoluteSourcePath, options)
  if (cssImports.size === 0) {
    return {
      js: source,
      css,
    }
  }

  await Promise.all(
    Array.from(cssImports).map((cssImport) =>
      (async () => {
        const { absolutePath, importSource, raw, specifier } = cssImport
        const { css: processedCSS, classmap } = await processCSS(
          raw,
          absolutePath
        )
        css.add(
          immutable({
            absolutePath,
            css: processedCSS,
            classmap,
            importSource,
            raw,
            specifier,
          })
        )
      })()
    )
  )

  const magicString = new MagicString(source)

  // add CSS specifier to lit-element import declaration
  if (litImport.namedSpecifier) {
    magicString.appendRight(litImport.namedSpecifier.end, `, css`)
  } else if (litImport.defaultSpecifier) {
    magicString.appendRight(litImport.defaultSpecifier.end, `, { css }`)
  }

  walk.full(AST, (node: DynamicAcornNode) => {
    for (const pcss of css) {
      for (const { should, mutate } of [
        inlineStylesheet,
        removeImport,
        replaceReferences,
      ]) {
        if (should(node, pcss)) {
          mutate(node, magicString, pcss, litImport)
        }
      }
    }
  })

  const js = magicString.toString()

  return {
    js,
    css,
  }
}

export default transform
