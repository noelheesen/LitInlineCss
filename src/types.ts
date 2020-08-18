export type Nullable<T> = T | null

export interface CSSResult {
  absolutePath: string
  css: string
  classmap: Map<string, string>
  specifier: CSSImportNodeSpecifier
  raw: string
  importSource: string
}

export interface CSSProcessResult {
  css: string
  dependencies: Set<string>
}

export interface PostCSSProcessResult extends CSSProcessResult {
  classmap: Map<string, string>
}

export interface CSSLoaderResult {
  absolutePath: string
  raw: string
  extension: string
  specifier: CSSImportNodeSpecifier
  importSource: string
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

export interface LitInlineCSSResult {
  js: string
  css: Set<unknown>
}
