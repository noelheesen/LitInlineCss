import MagicString from 'magic-string'
import { DynamicAcornNode, CSSResult } from '@/types'

const should = (node: DynamicAcornNode, css: CSSResult): boolean => {
  return (
    node.type === 'ImportDeclaration' && node.source.value === css.importSource
  )
}

const mutate = (node: DynamicAcornNode, magicString: MagicString): void => {
  // add + 1 to remove EOL
  magicString.remove(node.start, node.end + 1)
}

const removeImport = {
  should,
  mutate,
}

export default removeImport
