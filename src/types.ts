export interface CSSProcessResult {
  css: string
}

export interface PostCSSProcessResult extends CSSProcessResult {
  classmap: Map<string, string>
}

export interface CSSLoaderResult extends CSSImportNode {
  absolutePath: string
  raw: string
  extension: string
}

export interface DynamicAcornNode extends acorn.Node {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any
  /* eslint-enable */
}

export interface CSSImportNodeSpecifier {
  default: string | null
  named: Set<string>
  namespace: string | null
}

export interface CSSImportNode {
  /**
   * e.g. './styles.css', '@/styles/a.css'
   */
  importSource: string
  specifier: CSSImportNodeSpecifier
}

export interface LitImportNodeSpecifier {
  end: number
  name?: string
  start: number
}

export interface LitImportNode {
  defaultSpecifier: Nullable<LitImportNodeSpecifier>
  namedSpecifier: Nullable<LitImportNodeSpecifier>
  namespace: Nullable<string>
}
