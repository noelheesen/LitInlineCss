import MagicString from 'magic-string'
import type { CSSResult, DynamicAcornNode, LitImportNode } from '@/types'

const should = (node: DynamicAcornNode, css: CSSResult): boolean => {
  if (node.type === 'AssignmentExpression' && node.operator === '=') {
    const { left, right } = node

    if (
      left.type === 'MemberExpression' &&
      left.property.name === 'styles' // this is the styles property on the LitElement component.
    ) {
      if (right.type === 'Identifier') {
        return right.name === css.specifier.default
      } else if (right.type === 'ArrayExpression') {
        return right.elements.some((x: any) => x.name === css.specifier.default)
      }
    }
  }

  return false
}

const mutate = (
  node: DynamicAcornNode,
  magicString: MagicString,
  css: CSSResult,
  litImport: LitImportNode
): void => {
  // set default to named import from lit-element
  let cssImportName = 'css'

  if (litImport.namespace) {
    cssImportName = `${litImport.namespace}.css`
  }

  if (node.right.type === 'Identifier') {
    magicString.overwrite(
      node.right.start,
      node.right.end,
      `${cssImportName}\`${css.css}\``
    )
  } else if (node.right.type === 'ArrayExpression') {
    for (const el of node.right.elements) {
      if (el.name === css.specifier.default) {
        magicString.overwrite(
          el.start,
          el.end,
          `${cssImportName}\`${css.css}\``
        )
      }
    }
  }
}

const inlineStylesheet = {
  should,
  mutate,
}

export default inlineStylesheet
