export interface CSSProcessResult {
  css: string
}

export interface PostCSSProcessResult extends CSSProcessResult {
  classmap: Map<string, string>
}
