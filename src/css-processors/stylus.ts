import type { CSSProcessResult } from '@/types'

const process = async (
  source: string,
  absoluteSourcePath: string
): Promise<CSSProcessResult> => {
  const stylus = await import('stylus')
  const style = stylus.default(source, {
    filename: absoluteSourcePath,
  })

  const css = await new Promise<string>((resolve, reject) => {
    style.render((err, css) => {
      if (err) {
        reject(err)
      }
      resolve(css)
    })
  })

  return {
    css,
  }
}

const test = /\.(styl|stylus)$/

export default {
  test,
  process,
}
