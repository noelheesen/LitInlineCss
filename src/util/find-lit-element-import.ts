import type {
  DynamicAcornNode,
  LitImportNodeSpecifier,
  LitImportNode,
} from '@/types'

const findLitElementImport = (
  AST: DynamicAcornNode
): Nullable<LitImportNode> => {
  for (const node of AST.body) {
    if (
      node.type === 'ImportDeclaration' &&
      node.source.value === 'lit-element'
    ) {
      let defaultSpecifier: Nullable<LitImportNodeSpecifier> = null
      let namedSpecifier: Nullable<LitImportNodeSpecifier> = null
      let namespace: Nullable<string> = null

      for (const specifier of node.specifiers) {
        if (specifier.type === 'ImportDefaultSpecifier') {
          defaultSpecifier = {
            end: specifier.end,
            name: specifier.local.name,
            start: specifier.start,
          }
        }

        if (specifier.type === 'ImportNamespaceSpecifier') {
          namespace = specifier.local.name
        }
      }

      if (namespace) {
        if (defaultSpecifier) {
          console.debug(
            'node has default specifier and namespace which should not be possible, ignoring default, node:',
            node
          )
        }

        return {
          defaultSpecifier: null,
          namedSpecifier: null,
          namespace,
        }
      }

      const lastSpecifier = node.specifiers[node.specifiers.length - 1]
      if (lastSpecifier.type === 'ImportSpecifier') {
        namedSpecifier = {
          end: lastSpecifier.end,
          start: lastSpecifier.start,
        }
      }

      if (defaultSpecifier || namedSpecifier) {
        if (defaultSpecifier !== null) {
          if (namedSpecifier !== null) {
            return {
              defaultSpecifier,
              namedSpecifier,
              namespace: null,
            }
          } else {
            return {
              defaultSpecifier,
              namedSpecifier: null,
              namespace: null,
            }
          }
        } else {
          if (namedSpecifier !== null) {
            return {
              defaultSpecifier: null,
              namedSpecifier,
              namespace: null,
            }
          }
        }
      }
    }
  }

  return null
}

export default findLitElementImport
