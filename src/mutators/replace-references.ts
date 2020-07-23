import MagicString from 'magic-string'
import { CSSResult, DynamicAcornNode } from '../types'

const should = (node: DynamicAcornNode, css: CSSResult): boolean => {
  if (node.type === 'Property') {
    const { key } = node
    if (
      key.type === 'MemberExpression' &&
      key.object.name === css.specifier.default
    ) {
      if (css.classmap.has(key.property.value || key.property.name)) {
        return true
      }
    }
  }
  return false
}

const mutate = (
  node: DynamicAcornNode,
  magicString: MagicString,
  css: CSSResult
): void => {
  const mappedValue = css.classmap.get(
    node.key.property.value || node.key.property.name
  )

  // -+ 1 for brackets
  magicString.overwrite(
    node.key.start - 1,
    node.key.end + 1,
    `'${mappedValue}'`
  )
}

const replaceReference = {
  should,
  mutate,
}

export default replaceReference
