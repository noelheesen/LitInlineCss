declare module '*.css'
declare module '*.less'
declare module '*.sass'
declare module '*.scss'
declare module '*.styl'
declare module '*.stylus'

declare module 'postcss-modules' {
  export default function (options: {
    generateScopedName: string
    getJSON: (_, json: string) => void
  }): postcss.Plugin
}

declare module 'postcss-import'
