import * as walk from 'acorn-walk'
import path, { isAbsolute } from 'path'
import immutable from '@/util/immutable'
import readFileSync from '@/util/read-file-sync'
import resolveAbsolutePath from '@/util/resolve-absolute-path'
import type {
  DynamicAcornNode,
  CSSImportNodeSpecifier,
  CSSLoaderResult,
} from '@/types'

const loadCSS = async (
  AST: DynamicAcornNode,
  absoluteSourcePath: string,
  options?: {
    moduleNameMappings?: Record<string, string>
    rootDir?: string
  }
): Promise<Set<Readonly<CSSLoaderResult>>> => {
  const result = new Set<Readonly<CSSLoaderResult>>()

  walk.full(AST, (node: DynamicAcornNode) => {
    if (node.type !== 'ImportDeclaration') {
      return
    }

    const importSource: string = node.source.value.slice()

    const absolutePath = resolveAbsolutePath(
      importSource,
      absoluteSourcePath,
      options?.rootDir || process.cwd(),
      options?.moduleNameMappings
    )

    if (!absolutePath || !isAbsolute(absolutePath)) {
      throw new Error(
        `LitInlineCss could not resolve absolute path for import:, ${importSource}`
      )
    }

    const extension = path.extname(absolutePath)

    if (!extension.match(/(styl(us)?|(c|a)ss|less)$/)) {
      return
    }

    const specifier: CSSImportNodeSpecifier = {
      default: null,
      named: new Set<string>(),
      namespace: null,
    }

    for (const s of node.specifiers) {
      const value = s.local.name

      if (s.type === 'ImportNamespaceSpecifier') {
        specifier.namespace = value
      } else {
        if (s.type === 'ImportDefaultSpecifier') {
          specifier.default = value
        }
        if (s.type === 'ImportSpecifier') {
          specifier.named.add(value)
        }
      }
    }

    const raw = readFileSync(absolutePath)

    result.add(
      immutable({
        absolutePath,
        raw,
        extension,
        importSource,
        specifier,
      })
    )
  })

  return result
}

export default loadCSS
